import { SecondLandingPage } from "@/appPages/SecondLandingPage";
export default function Home() {
  return (
    <>
      <SecondLandingPage />
    </>
  );
}
// "use client";
// import LanguageSwitcher from '@/components/LanguageSwitch/LanguageSwitch';
// import { useTranslation } from 'react-i18next';

// export default function HomePage() {
//   const { t } = useTranslation('common');

//   return (
//     <div style={{ marginTop: '100px' }}>
//       <h1>{t('welcome')}</h1>
//       <p>{t('description')}</p>
//       <LanguageSwitcher />
//     </div>
//   );
// }