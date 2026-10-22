const fs = require('fs');

const content = fs.readFileSync('svg.txt', 'utf8');

// Match everything from <svg to </svg>
const svgRegex = /<svg[\s\S]*?<\/svg>/g;
const matches = content.match(svgRegex);

if (matches) {
  matches.forEach((svg, index) => {
    fs.writeFileSync(`extracted_${index}.svg`, svg);
    console.log(`Saved extracted_${index}.svg`);
  });
} else {
  console.log('No SVGs found.');
}
