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

let updatedCount = 0;
for (const id of ids) {
  // Use [^}] to prevent matching across objects
  const hasAvatar = new RegExp(`id:\\s*'${id}',[^}]*?avatar:\\s*'`).test(data);
  if (!hasAvatar) {
    console.log(`Missing avatar for: ${id}`);
    const regex = new RegExp(`(id:\\s*'${id}',)`);
    data = data.replace(regex, `$1\n    avatar: 'assets/icons/icon_${id}.png',`);
    updatedCount++;
  }
}

fs.writeFileSync('data.js', data);
console.log(`Fixed ${updatedCount} avatars.`);
