const fs = require('fs');
let data = fs.readFileSync('data.js', 'utf8');

const ids = [
  'amaranth', 'bittermelon', 'bokchoy', 'broad_bean', 'broccoli', 'cabbage_head',
  'calabash', 'carrot', 'cauliflower', 'celery', 'coriander', 'corn', 'cowpea',
  'crown_daisy', 'cucumber', 'edamame', 'eggplant', 'everbearing_strawberry',
  'garlic', 'ginger', 'green_bean', 'greenonion', 'leek_chinese', 'lettuce',
  'luffa', 'melon', 'napacabbage', 'okra', 'onion', 'pea', 'pepper', 'potato',
  'pumpkin', 'radish', 'spinach', 'strawberry', 'sweetpotato', 'taro', 'tomato',
  'water_spinach', 'watermelon', 'winter_melon', 'yam', 'zucchini'
];

for (const id of ids) {
  // Replace the avatar line within the block of this id
  // The block starts with `id: 'id',`
  const regex = new RegExp(`(id:\\s*'${id}',[^}]*?avatar:\\s*')([^']+)(')`);
  if (regex.test(data)) {
    data = data.replace(regex, `$1assets/icons/icon_${id}.png$3`);
  }
}

fs.writeFileSync('data.js', data);
console.log('Fixed avatar paths directly!');
