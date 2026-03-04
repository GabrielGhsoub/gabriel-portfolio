// Import company logos
import bcomLogo from '../assets/images/companies/intelsat.svg';
import gcgLogo from '../assets/images/companies/GCG.png';
import inspireLogo from '../assets/images/companies/inspire_innovations_logo.jpg';
import wonderEightLogo from '../assets/images/companies/WonderEight.jpg';
import blomBankLogo from '../assets/images/companies/Blom-bank.jpg';
import bbaLogo from '../assets/images/companies/BBA icon.png';

export const companyLogos: Record<string, string> = {
  Speedlane: '',
  'Lawyers Syndicate': bbaLogo,
  Bcom: bcomLogo,
  'GCG (Ghoussoub Consulting Group)': gcgLogo,
  'EmblemHealth (via Inspire Innovations)': inspireLogo,
  'WonderEight Agency': wonderEightLogo,
  'Blom Bank': blomBankLogo,
};

export const companyLinkedInUrls: Record<string, string> = {
  Speedlane: 'https://www.linkedin.com/company/speedlane',
  'Lawyers Syndicate': 'https://www.bba24.org/',
  Bcom: 'https://www.linkedin.com/company/bcom/posts/?feedView=all',
  'GCG (Ghoussoub Consulting Group)':
    'https://www.linkedin.com/company/gcginnovate/posts/?feedView=all',
  'EmblemHealth (via Inspire Innovations)':
    'https://www.linkedin.com/company/inspire-innovations/posts/?feedView=all',
  'WonderEight Agency':
    'https://www.linkedin.com/company/wondereight/posts/?feedView=all',
  'Blom Bank': 'https://www.linkedin.com/company/blom-bank/posts/?feedView=all',
};

export const getCompanyLogo = (companyName: string): string | null => {
  return companyLogos[companyName] || null;
};

export const getCompanyLinkedIn = (companyName: string): string | null => {
  return companyLinkedInUrls[companyName] || null;
};
