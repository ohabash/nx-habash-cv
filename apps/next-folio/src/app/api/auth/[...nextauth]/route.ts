import { slugify2 } from '@nx-habash/utils';
import NextAuth, { NextAuthOptions, User } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { update } from 'firebase/database';
import { AdapterUser } from 'next-auth/adapters';
import { ProfileService } from '@/components/profile/profile.service';

const authOptions: NextAuthOptions = {
  // pages: {
  //   signIn: '/auth/login',
  // },
  callbacks: {
    async signIn(params) {
      // console.log(`🚀🔒🔒🔒🔒🔒🔒🔒🔒 => CALLBACK.SIGNIN => params:`, params);
      return Promise.resolve(true);
    },
    async jwt(params) { 
      console.log(`🚀 => jwt => process.env.GOOGLE_ID:`, process.env.GOOGLE_ID);
      if (params.user) {
        // user only available on sign in
        params.token = await addToToken(params);
        // make sure user has new id
        params.user.id = params.token?.id as string;
        // update profile
        const profile = updateProfile(params.user);
      }``

      // dev
      // console.log(`🚀🔒🔒🔒🔒🔒🔒🔒🔒 => CALLBACK.JWT => params:`, params);

      // return updated token
      return Promise.resolve(params.token);
    },
    session: async (params) => {
      params.session = {
        ...params.session,
        user: {
          ...params.session.user,
          id: params.token?.id,
        } as any,
      };
      // console.log(`🚀🔒🔒🔒🔒🔒🔒🔒🔒 => CALLBACK.SESSION => params:`, params);
      return Promise.resolve(params.session);
    },
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        // Replace this logic with your authentication (e.g., check against a database)
        if (
          credentials?.email === 'test@example.com' &&
          credentials.password === 'password'
        ) {
          return { id: 1, name: 'Test User', email: 'test@example.com' };
        }
        return null as any;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? 'XXXXXXXX',
      clientSecret: process.env.GOOGLE_SECRET ?? 'XXXXXXXX',
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? 'XXXXXXXX',
      clientSecret: process.env.GITHUB_SECRET ?? 'XXXXXXXX',
    }),
  ],
  session: {
    strategy: 'jwt',
  },
};

// function getProfile(user: User | AdapterUser) {
//   const profileService = ProfileService.init(user, null, '[...nextauth]/route.ts');
//   if (!profileService) return;
//   return profileService.setProfile();
// }

async function updateProfile(user: User | AdapterUser) {
  const profileService = ProfileService.init(user.id, null, '[...nextauth]/route.ts');
  if (!profileService) return;
  return await profileService.updateMissingProfileFields(user);
}

async function addToToken(params: any) {
  // user only available on sign in
  if (params.user) {
    params.token = {
      ...(params.token as any),
      id: slugify2(params.user?.email || 'xxx'),
      // profile: await getProfile(params.user as any),
    };
  }
  return Promise.resolve(params.token);
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
// export default NextAuth(authOptions);
