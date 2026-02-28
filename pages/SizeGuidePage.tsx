import React from 'react';

interface SizeData {
  name: string;
  slug: string;
  headers: string[];
  rows: string[][];
}

const SIZE_GUIDES: SizeData[] = [
  {
    name: 'Ref Shorts',
    slug: 'ref-shorts',
    headers: ['Measurement (cm)', 'XS', 'S', 'M', 'L', 'XL'],
    rows: [
      ['Waist (half)', '28', '30', '32', '34', '36'],
      ['Hip (half)', '32.5', '34.5', '36.5', '38.5', '40.5'],
      ['Front Rise', '11.5', '12.5', '13.5', '14.5', '15.5'],
      ['Back Rise', '17.2', '18.4', '19.6', '20.8', '22'],
      ['Inseam', '14', '14.5', '15', '15.5', '16'],
    ],
  },
  {
    name: 'Elevate V-Legging',
    slug: 'elevate-v-legging',
    headers: ['Measurement (cm)', 'XS', 'S', 'M', 'L', 'XL'],
    rows: [
      ['Waist', '52', '56', '60', '64', '68'],
      ['Hip', '70', '74', '78', '82', '86'],
      ['Waistband', '9', '9', '9', '9', '9'],
      ['Inseam', '67.5', '68', '68.5', '69', '69.5'],
      ['Full Length', '90', '91', '92', '93', '94'],
    ],
  },
  {
    name: 'Core Flow Legging',
    slug: 'core-flow-legging',
    headers: ['Measurement (cm)', 'XS', 'S', 'M', 'L', 'XL'],
    rows: [
      ['Waist', '54', '58', '62', '66', '70'],
      ['Hip', '72', '76', '80', '84', '88'],
      ['Waistband', '9', '9', '9', '9', '9'],
      ['Inseam', '66', '66.5', '67', '67.5', '68'],
      ['Full Length', '87', '88', '89', '90', '91'],
    ],
  },
  {
    name: 'Pulse Bra',
    slug: 'pulse-bra',
    headers: ['Measurement (cm)', 'XS', 'S', 'M', 'L', 'XL'],
    rows: [
      ['Bust', '62', '66', '70', '74', '78'],
      ['Hem', '54', '58', '62', '66', '70'],
      ['Center Front Length', '29.2', '29.5', '29.8', '30.1', '30.4'],
      ['Elastic Width', '2.5', '2.5', '2.5', '2.5', '2.5'],
    ],
  },
  {
    name: 'Edge Bra',
    slug: 'edge-bra',
    headers: ['Measurement (cm)', 'XS', 'S', 'M', 'L', 'XL'],
    rows: [
      ['Half Bust', '33', '35', '37', '39', '41'],
      ['Half Hem', '30', '32', '34', '36', '38'],
      ['Front Rise', '14.7', '15.4', '16.1', '16.8', '17.5'],
      ['Back Rise', '13', '13.5', '14', '14.5', '15'],
    ],
  },
  {
    name: 'Layer Tee',
    slug: 'layer-tee',
    headers: ['Measurement (cm)', 'XS', 'S', 'M', 'L', 'XL'],
    rows: [
      ['Bust', '70', '74', '78', '82', '86'],
      ['Waist', '58', '62', '66', '70', '74'],
      ['Hem', '65', '69', '73', '77', '81'],
      ['Center Front Length', '40', '40.8', '41.6', '42.4', '43.2'],
      ['Sleeve Opening', '26', '27', '28', '29', '30'],
      ['Sleeve Length', '12.5', '13', '13.5', '14', '14.5'],
    ],
  },
  {
    name: 'Flow Dress',
    slug: 'flow-dress',
    headers: ['Measurement (cm)', 'XS', 'S', 'M', 'L', 'XL'],
    rows: [
      ['Total Length', '78', '80', '82', '84', '86'],
      ['Shoulder Strap Width', '3', '3', '3', '3', '3'],
      ['Half Bust', '36', '38', '40', '42', '44'],
      ['Half Waist', '30', '32', '34', '36', '38'],
      ['Leg Opening (half)', '21', '22', '23', '24', '25'],
      ['Shorts Inseam', '10', '10', '10', '10', '10'],
    ],
  },
  {
    name: 'Athletic Long Sleeve Tank Crop Top',
    slug: 'athletic-long-sleeve',
    headers: ['Measurement (cm)', 'XS', 'S', 'M', 'L', 'XL'],
    rows: [
      ['Bust', '70', '74', '78', '82', '86'],
      ['Waist', '58', '62', '66', '70', '74'],
      ['Hem', '60', '64', '68', '72', '76'],
      ['Center Front Length', '32.5', '33', '33.5', '34', '34.5'],
      ['Sleeve Opening', '16', '17', '18', '19', '20'],
      ['Sleeve Length', '61', '62', '63', '64', '65'],
    ],
  },
];

function SizeTable({ data, key: _key, ...rest }: { data: SizeData; key?: string }) {
  return (
    <div className="mb-8">
      <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#2e0015] mb-3">
        {data.name}
      </h3>
      <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
        <table className="w-full min-w-[360px] border-collapse text-xs sm:text-sm">
          <thead>
            <tr>
              {data.headers.map((h) => (
                <th
                  key={h}
                  className="bg-[#2e0015] text-white py-2.5 px-2 sm:px-3 text-center font-medium tracking-wide first:text-left"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, i) => (
              <tr key={i} className="hover:bg-[#faf7f6] transition-colors">
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className={`py-2.5 px-2 sm:px-3 border-b border-[#ebebeb] ${j === 0 ? 'text-left font-medium' : 'text-center'}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-[11px] sm:text-xs text-gray-400 mt-2">
        All measurements in cm. Unsure? Size up.
      </p>
    </div>
  );
}

export default function SizeGuidePage({ product }: { product?: string }) {
  const guides = product
    ? SIZE_GUIDES.filter((g) => g.slug === product)
    : SIZE_GUIDES;

  return (
    <div
      className="min-h-screen bg-white font-sans text-gray-800"
      style={{ fontFamily: "'Inter', -apple-system, sans-serif" }}
    >
      <div className="max-w-2xl mx-auto px-4 py-6 sm:py-8">
        {guides.map((g) => (
          <SizeTable key={g.slug} data={g} />
        ))}
      </div>
    </div>
  );
}

export { SIZE_GUIDES };
