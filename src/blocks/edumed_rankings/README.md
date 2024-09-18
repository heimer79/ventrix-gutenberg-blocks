# Edumed Rankings Block

## Overview

The Edumed Rankings Block is a custom block for Gutenberg that allows users to display rankings for educational institutions. It supports both school rankings and feature rankings, enabling a flexible presentation of educational data based on various attributes.

## Features

- **Dynamic Rankings**: The block retrieves and displays rankings based on different post types, such as `school_ranking` and `feature_ranking`.
- **Customizable Attributes**: You can customize several attributes:
  - `postType`: Determines the type of ranking to display (default is `school_ranking`).
  - `program`: Specifies the program for which the rankings are relevant.
  - `hasTwoAndFourYears`: Indicates if the rankings should consider both two-year and four-year programs.
  - `defaultLevelYear`: Sets the default level year to filter the rankings (either `two-year` or `four-year`).
  - `version`: Specifies the version of the rankings to display.
  - `defaultOpen`: Determines how many ranking items are initially opened.

## Installation

To use the Edumed Rankings Block:

1. Place the block files in your WordPress plugin directory.
2. Ensure the necessary dependencies (like `methodology_texts.php`, `feature-rankings.php`, and `tradicional-rankings.php`) are included as required in the block.
3. Register the block in your WordPress environment.

## Usage

To render the block, use the following PHP function in your theme or plugin:

```php
echo render_cafeto_edumed_rankings_block($attributes);
```

### Attributes

- `postType`: String (optional) - Type of ranking to display (default: `'school_ranking'`).
- `program`: String (optional) - The specific program for filtering rankings.
- `hasTwoAndFourYears`: String (optional) - Indicates the inclusion of both types of programs.
- `defaultLevelYear`: String (optional) - Default level year to filter rankings (values: `'two-year'` or `'four-year'`).
- `version`: String (optional) - Version of the ranking data to display.
- `defaultOpen`: Integer (optional) - The number of items to open by default.

## Rendering

The block renders a structured layout that includes:

- A top bar for navigation or filters depending on the ranking type.
- A section listing the ranking items, which includes details such as name, URL, and tuition cost.
- A JSON-LD schema markup for better SEO and structured data.
- A popup section with methodology text for the rankings.

## Error Handling

If no rankings are found, a message will be displayed indicating that no results were returned. Additionally, the block checks for the existence of required SVG icon files and logs errors if they are missing.

## Contributing

Contributions to enhance the functionality or fix bugs in the Edumed Rankings Block are welcome. Please submit a pull request or open an issue for discussion.

## License

This project is licensed under the MIT License. Please refer to the `LICENSE` file for more details.

---

Feel free to modify this README template based on your specific use case or additional features that your block might have!
