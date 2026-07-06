# Image Generation Rules for Tubutu Farm App

When generating images for this project, STRICTLY follow these style guidelines to maintain consistency across the app:

## 1. Main Crop Images
- **Style:** High-quality, photorealistic close-up photography.
- **Content:** The mature fruit/vegetable/flower prominently displayed.
- **Setting:** Placed on a rustic wooden table or in a natural but staged setting, warm natural lighting, professional food photography style.

## 2. Growth Stage Images
- **Style:** Cute 2D vector flat design art style, clean thick outlines, pastel colors.
- **Background:** Clean white background.
- **Specific Rules:**
  - **Seed Stage:** Only the seeds should be drawn, cleanly scattered in a cluster. **NO soil, NO dirt blocks.**
  - **Plant Structure:** Accurately reflect the biological structure of the plant (e.g., sunflowers must have straight, upright stalks; only vining crops like watermelons should have vines).

## 3. Agricultural Operation Images
- **Style:** Flat vector illustration matching the growth stages (cute 2D flat design, clean lines, pastel colors).
- **Content:** Usually depicts hands performing the specific agricultural task (e.g., hands pruning with scissors, hands thinning seedlings, hands pollinating with a brush).
- **Background:** Clean white background or minimal context to focus on the action.


# Crop Data Configuration Rules

When adding or modifying crop data in `data.js`, you MUST adhere to the following biological data standards to prevent inaccurate growth predictions:

## 1. Biological Base Temperature (`baseTemp`)
Always assign `baseTemp` based on the crop's real-world thermal requirements:
- **Cold-hardy crops** (e.g., Cabbage, Radish, Spinach, Broad Beans, Peas): `3 - 5°C`
- **Warm-season crops** (e.g., Tomato, Pepper, Cucumber, Corn): `10 - 12°C`
- **Tropical / Highly heat-loving crops** (e.g., Sweet Potato, Ginger, Water Spinach, Amaranth, Okra): `15°C`

## 2. Target Growing Degree Days (`targetGDD` & `growthSequence`)
Do NOT use arbitrary large numbers (like 1500 or 2000). Calculate the required GDD based on the **Days to Maturity (DTM)** for a typical home garden early/mid-season variety:
- **Calculation Formula**: `Target GDD ≈ DTM × (Average Summer Temp - baseTemp)`
- Example (Watermelon): 80 Days × (27°C - 12°C) = 1200 GDD.
- **Verification**: Ensure that the sum of `gdd` values in the `growthSequence` exactly matches the intended `Target GDD`.
