# Testimonial Card Block - Site-Specific Styles

This testimonial card block includes site-specific styles based on the ACF configuration.

## Configuration

### Supported Sites

1. **Edumed** (`edumed`) - Default style
   - Colors: Blue (#1a237e) and purple (#3f51b5)
   - Gradient: White to light blue

2. **Public Service Degrees** (`psd`)
   - Colors: Green (#2e7d32) and light green (#4caf50)
   - Gradient: White to light green

3. **Online Masters Degrees** (`omd`)
   - Colors: Purple (#7b1fa2) and magenta (#9c27b0)
   - Gradient: White to light pink

4. **PhDs Me** (`phds`)
   - Colors: Red (#d32f2f) and light red (#f44336)
   - Gradient: White to light orange

5. **Online Colleges** (`oc`)
   - Colors: Blue (#1976d2) and light blue (#2196f3)
   - Gradient: White to light blue

## Style Files

- `styles/edumed.scss` - Styles for Edumed
- `styles/psd.scss` - Styles for Public Service Degrees
- `styles/omd.scss` - Styles for Online Masters Degrees
- `styles/phds.scss` - Styles for PhDs Me
- `styles/oc.scss` - Styles for Online Colleges

## How It Works

1. **ACF Configuration**: The `select_current_site` field in theme options determines which styles to apply.
2. **CSS Classes**: The class `testimonial-card--{site}` is automatically added to the block.
3. **Dynamic Styles**: Styles are loaded dynamically based on the user's selection.
4. **Fallback**: If the site cannot be determined, 'edumed' is used as the default.

## Usage

1. Go to **Settings > Ventrix Blocks** in the WordPress admin.
2. Select the current site in the "Select Current Site" field.
3. Save the changes.
4. The testimonial card blocks will display with the corresponding styles.

## CSS Class Structure
