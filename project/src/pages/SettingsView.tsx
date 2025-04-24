import React, { useState } from 'react';
import { getUserSettings, saveUserSettings } from '../utils/storageUtils';
import { Switch } from '@headlessui/react';
import { Moon, Sun, Volume2, Bell, Globe } from 'lucide-react';

const SettingsView: React.FC = () => {
  const [settings, setSettings] = useState(getUserSettings());

  const handleSettingChange = (key: keyof typeof settings, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    saveUserSettings(newSettings);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Settings</h1>

      <div className="bg-white rounded-xl shadow-sm divide-y">
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-gray-100 rounded-lg">
              {settings.theme === 'dark' ? (
                <Moon className="h-5 w-5 text-gray-600" />
              ) : (
                <Sun className="h-5 w-5 text-amber-500" />
              )}
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Theme</h3>
              <p className="text-sm text-gray-500">Choose your preferred theme</p>
            </div>
          </div>
          <Switch
            checked={settings.theme === 'dark'}
            onChange={(checked) => handleSettingChange('theme', checked ? 'dark' : 'light')}
            className={`${
              settings.theme === 'dark' ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
          >
            <span
              className={`${
                settings.theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
          </Switch>
        </div>

        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Volume2 className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Autoplay</h3>
              <p className="text-sm text-gray-500">Automatically play next video</p>
            </div>
          </div>
          <Switch
            checked={settings.autoplay}
            onChange={(checked) => handleSettingChange('autoplay', checked)}
            className={`${
              settings.autoplay ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
          >
            <span
              className={`${
                settings.autoplay ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
          </Switch>
        </div>

        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Bell className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Notifications</h3>
              <p className="text-sm text-gray-500">Receive progress updates</p>
            </div>
          </div>
          <Switch
            checked={settings.notifications}
            onChange={(checked) => handleSettingChange('notifications', checked)}
            className={`${
              settings.notifications ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
          >
            <span
              className={`${
                settings.notifications ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
          </Switch>
        </div>

        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Globe className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Subtitle Language</h3>
              <p className="text-sm text-gray-500">Choose your preferred language</p>
            </div>
          </div>
          <select
            value={settings.subtitle}
            onChange={(e) => handleSettingChange('subtitle', e.target.value)}
            className="block rounded-md border-gray-200 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>

        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Volume2 className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Playback Speed</h3>
              <p className="text-sm text-gray-500">Adjust video playback speed</p>
            </div>
          </div>
          <select
            value={settings.playbackSpeed}
            onChange={(e) => handleSettingChange('playbackSpeed', parseFloat(e.target.value))}
            className="block rounded-md border-gray-200 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="0.5">0.5x</option>
            <option value="0.75">0.75x</option>
            <option value="1">1x</option>
            <option value="1.25">1.25x</option>
            <option value="1.5">1.5x</option>
            <option value="2">2x</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;