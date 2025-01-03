import React from 'react'
import { GiSpy } from 'react-icons/gi';
import { SettingsPanel, SettingsRow, SettingsItem } from '../settings/SettingsPanel';

export const NoAuthError = () => {
  return (
    <div>
      <SettingsPanel>
        <SettingsRow className={''}>
          <SettingsItem
            icon={<GiSpy className="text-2xl" />}
            title="Wait a Minute"
            className="p-4 border-dark/80"
          >
            <p>
              I’d love to show you this page, but I don’t even know who you are.
              Redirecting to fix that...
            </p>
          </SettingsItem>
        </SettingsRow>
      </SettingsPanel>

      <script
        dangerouslySetInnerHTML={{
          __html: `setTimeout(() => { window.location.href = '/auth/login'; }, 3000);`,
        }}
      ></script>
    </div>
  );
}

