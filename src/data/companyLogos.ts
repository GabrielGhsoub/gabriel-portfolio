// Import company logos
import bcomLogo from '../assets/images/companies/intelsat.svg';
import gcgLogo from '../assets/images/companies/gcg.webp';
import inspireLogo from '../assets/images/companies/inspire.webp';
import wonderEightLogo from '../assets/images/companies/wondereight.webp';
import blomBankLogo from '../assets/images/companies/blom-bank.webp';
import bbaLogo from '../assets/images/companies/bba.webp';

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
