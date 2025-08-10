export interface CalculationTestCase {
  principal: string;
  rate: string;
  duration: 'Daily' | 'Monthly' | 'Yearly';
  description: string;
}

export interface MandatoryFieldTestCase {
  principal: string;
  rate: string;
  duration: string;
  consent: boolean;
  field: string;
}

// Valid Calculation Test Cases (Requirements 1-5, 8)
export const validCalculationCases: CalculationTestCase[] = [
  { 
    principal: '1000', 
    rate: '5%', 
    duration: 'Daily', 
    description: 'Daily calculation test' 
  },
  { 
    principal: '1000', 
    rate: '5%', 
    duration: 'Monthly', 
    description: 'Monthly calculation test' 
  },
  { 
    principal: '1000', 
    rate: '5%', 
    duration: 'Yearly', 
    description: 'Yearly calculation test' 
  },
  { 
    principal: '1000', 
    rate: '15%', 
    duration: 'Yearly', 
    description: 'Maximum rate test' 
  },
  {
    principal: '2500',
    rate: '10%',
    duration: 'Monthly',
    description: 'Decimal rounding test case'
  },
  {
    principal: '750.50',
    rate: '7.5%',
    duration: 'Daily',
    description: 'Decimal principal amount test'
  }
];

// Mandatory Field Validation Cases (Requirements 6-7)
export const mandatoryFieldCases: MandatoryFieldTestCase[] = [
  { 
    principal: '', 
    rate: '5%', 
    duration: 'Yearly', 
    consent: true, 
    field: 'principal' 
  },
  { 
    principal: '1000', 
    rate: '', 
    duration: 'Yearly', 
    consent: true, 
    field: 'rate' 
  },
  { 
    principal: '1000', 
    rate: '5%', 
    duration: '', 
    consent: true, 
    field: 'duration' 
  },
  { 
    principal: '1000', 
    rate: '5%', 
    duration: 'Yearly', 
    consent: false, 
    field: 'consent' 
  }
];

// Interest Rate Options (Requirement 3)
export const interestRateOptions = [
  '1%', '2%', '3%', '4%', '5%', 
  '6%', '7%', '8%', '9%', '10%',
  '11%', '12%', '13%', '14%', '15%'
];

// Duration Options (Requirement 1)
export const durationOptions = ['Daily', 'Monthly', 'Yearly'] as const;

// Responsive Design Test Viewports (Requirement 9)
export const responsiveViewports = [
  { name: 'Mobile', width: 375, height: 667 },
  { name: 'Tablet', width: 768, height: 1024 },
  { name: 'Desktop', width: 1920, height: 1080 }
];

// Expected Error Messages (Requirements 7, 10)
export const expectedErrorMessages = {
  principal: 'Principal amount is required',
  rate: 'Interest rate must be selected',
  duration: 'Duration must be selected',
  consent: 'Consent is required'
};
