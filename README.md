# Mortgage Calculator

A simple yet advanced mortgage calculator created for fun with [Claude Code](https://claude.com/claude-code).

## Why this project?

I couldn't find a similar calculator that would allow easy simulation of:
- One-time and recurring overpayments
- Interest rate changes (WIBOR) over time
- Real installment values accounting for inflation
- Payment holidays
- Changes in installment count

## Features

- ✅ **Equal and decreasing installments** - choice of loan repayment type
- ✅ **Overpayments** - one-time and recurring with strategy selection (shorten period or lower installment)
- ✅ **Interest rate changes** - simulate WIBOR changes in specific months
- ✅ **Inflation** - calculate real installment values accounting for inflation
- ✅ **Payment holidays** - ability to plan interest-only payment periods
- ✅ **Save simulations** - parameters and events saved in browser's localStorage
- ✅ **Bilingual** - interface in Polish and English
- ✅ **Responsive design** - works on desktop and mobile devices

## How to use

1. Open `index.html` in your browser
2. Fill in basic loan parameters
3. Add expected events (overpayments, interest rate changes, etc.)
4. Click "Calculate Payment Schedule"
5. Optionally save the simulation for later use

## Technologies

- HTML5
- CSS3 (Bootstrap 5.3.0)
- Vanilla JavaScript
- Bootstrap Icons
- Google Fonts (Poppins)

## Project structure

```
mortgage_calculator/
├── index.html          # Main HTML file
├── script.js           # Calculator logic and i18n
├── styles.css          # Styling (navy blue theme)
├── .gitignore          # Git ignore file
└── README.md           # This file
```

## Screenshot

![Mortgage Calculator](screenshot.png)

## License

This project is available under the MIT License.

## Author

Project created using [Claude Code](https://claude.com/claude-code) - AI programming tool from Anthropic.

---

💡 **Tip**: Feel free to modify the code and adapt the calculator to your needs!
