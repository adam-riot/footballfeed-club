'use client'

import { useState } from 'react'
import { supportedLanguages, Language } from '../../../../lib/languages'

export default function LanguageSettings() {
  const [currentLanguage, setCurrentLanguage] = useState('en')
  const [isLoading, setIsLoading] = useState(false)

  const handleLanguageChange = async (languageCode: string) => {
    setIsLoading(true)
    
    try {
      // In a real app, you would save this to database/localStorage
      localStorage.setItem('footballfeed_language', languageCode)
      setCurrentLanguage(languageCode)
      
      // Reload page to apply new language
      window.location.reload()
    } catch (error) {
      console.error('Failed to change language:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Language Settings</h1>
        <p className="text-gray-600 mt-2">
          Choose your preferred language for the Football Feed Club website
        </p>
      </div>

      {/* Current Language */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Current Language</h2>
        <div className="flex items-center space-x-4">
          {supportedLanguages
            .filter(lang => lang.code === currentLanguage)
            .map(lang => (
              <div key={lang.code} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <span className="text-2xl">{lang.flag}</span>
                <div>
                  <p className="font-medium text-blue-900">{lang.nativeName}</p>
                  <p className="text-sm text-blue-600">{lang.name}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Available Languages */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Available Languages</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {supportedLanguages.map((language: Language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              disabled={isLoading || language.code === currentLanguage}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                language.code === currentLanguage
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{language.flag}</span>
                <div className="text-left">
                  <p className={`font-medium ${
                    language.code === currentLanguage ? 'text-blue-900' : 'text-gray-900'
                  }`}>
                    {language.nativeName}
                  </p>
                  <p className={`text-sm ${
                    language.code === currentLanguage ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {language.name}
                  </p>
                </div>
                {language.code === currentLanguage && (
                  <div className="ml-auto">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Active
                    </span>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Language Info */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-2">About Multi-Language Support</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Content will be displayed in your selected language</li>
            <li>• Navigation menus and UI elements will be translated</li>
            <li>• Automated content will be generated in the selected language</li>
            <li>• Settings are saved automatically and apply across all pages</li>
          </ul>
        </div>

        {/* Coming Soon Features */}
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <h3 className="font-medium text-yellow-800 mb-2">🚀 Coming Soon</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Automatic content translation for existing articles</li>
            <li>• Regional football content based on language selection</li>
            <li>• Multi-language SEO optimization</li>
            <li>• Language-specific social media integration</li>
          </ul>
        </div>
      </div>

      {/* Apply Changes Button */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Apply Language Changes
        </button>
      </div>
    </div>
  )
}
