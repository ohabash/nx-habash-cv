'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { allData } from '@/data';
import { MdAlternateEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import { FaLinkedinIn } from 'react-icons/fa';
import { SendMessage } from './SendMessage';
import { PiTreePalmBold } from 'react-icons/pi';

const sig = `[ BusinessCard ] ::: `;

export const BusinessCard = () => {
  const { contactInfo } = allData;
  const [messageSent, setMessageSent] = useState(false);

  return (
    <div className="flex justify-center items-center py-6">
      <div className="relative w-auto sm:w-[28rem] h-auto rounded-2xl overflow-hidden">
        {/* Main Card Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-darkest via-darker to-dark rounded-2xl border border-darkBlue/30" />

        {/* Ambient lighting effects */}
        <div className="absolute inset-0 rounded-2xl">
          <div className="absolute top-0 left-1/4 w-48 h-48 bg-blue/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-accent3/5 rounded-full blur-2xl" />
        </div>

        {/* Content Layer */}
        <div className="relative z-20 p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-br from-blue/20 to-accent3/20 rounded-full border border-blue/30">
                <div className="w-8 h-8 bg-gradient-to-br from-blue to-accent3 rounded-full" />
              </div>
              <h1 className="text-xl uppercase tracking-wide font-bold text-white mb-1">
                Omar Habash
              </h1>
              <p className="text-blue/90 font-medium tracking-wide">
                Senior Full-Stack Developer
              </p>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-blue/50 to-transparent mx-auto mt-4" />
            </div>
          </div>

          {/* Contact Grid */}
          <div className="grid grid-cols-1 gap-3 mb-8">
            {/* Email */}
            <div>
              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-darker/40 backdrop-blur-sm border border-subtle/50 hover:border-blue/40 hover:bg-darker/60 transition-all duration-300 group"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-blue/10 rounded-lg flex items-center justify-center border border-blue/20 group-hover:bg-blue/20 group-hover:border-blue/40 transition-all duration-300">
                  <MdAlternateEmail className="text-blue text-lg" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm truncate">
                    {contactInfo.email}
                  </p>
                  <p className="text-white/50 text-xs">Email</p>
                </div>
              </a>
            </div>

            {/* Phone */}
            <div>
              <a
                href={`tel:${contactInfo.phone}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-darker/40 backdrop-blur-sm border border-subtle/50 hover:border-accent2/40 hover:bg-darker/60 transition-all duration-300 group"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-accent2/10 rounded-lg flex items-center justify-center border border-accent2/20 group-hover:bg-accent2/20 group-hover:border-accent2/40 transition-all duration-300">
                  <MdPhone className="text-accent2 text-lg" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm truncate">
                    {contactInfo.phone}
                  </p>
                  <p className="text-white/50 text-xs">Phone</p>
                </div>
              </a>
            </div>

            {/* Location */}
            <div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactInfo.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-darker/40 backdrop-blur-sm border border-subtle/50 hover:border-green/40 hover:bg-darker/60 transition-all duration-300 group"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-green/10 rounded-lg flex items-center justify-center border border-green/20 group-hover:bg-green/20 group-hover:border-green/40 transition-all duration-300">
                  <PiTreePalmBold className="text-green text-lg" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm truncate">
                    {contactInfo.address}
                  </p>
                  <p className="text-white/50 text-xs">Location</p>
                </div>
              </a>
            </div>

            {/* LinkedIn */}
            <div>
              <a
                href={contactInfo.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-darker/40 backdrop-blur-sm border border-subtle/50 hover:border-[#0077B5]/40 hover:bg-darker/60 transition-all duration-300 group"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-[#0077B5]/10 rounded-lg flex items-center justify-center border border-[#0077B5]/20 group-hover:bg-[#0077B5]/20 group-hover:border-[#0077B5]/40 transition-all duration-300">
                  <FaLinkedinIn className="text-[#0077B5] text-lg" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm truncate">
                    LinkedIn Profile
                  </p>
                  <p className="text-white/50 text-xs">Professional Network</p>
                </div>
              </a>
            </div>
          </div>

          {/* Contact Info Component */}
          <SendMessage
            requestInfo="Request for immediate contact information"
            buttonText="Message Me"
            iconType="email"
            onSuccess={() => setMessageSent(true)}
          />

          {/* Footer */}
          <div className="mt-6">
            <p className="text-white/40 text-xs text-center leading-relaxed">
              {messageSent
                ? "Thanks for reaching out! I'll respond soon."
                : "Ready to collaborate? Let's build something amazing together."}
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-6 right-6 pointer-events-none">
          <div className="w-12 h-12 bg-gradient-to-br from-accent3/10 to-blue/10 rounded-full backdrop-blur-sm border border-accent3/20" />
        </div>

        <div className="absolute bottom-6 left-6 pointer-events-none">
          <div className="w-8 h-8 bg-gradient-to-br from-blue/10 to-accent2/10 rounded-full backdrop-blur-sm border border-blue/20" />
        </div>
      </div>
    </div>
  );
}; 