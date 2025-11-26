# Banner Block

A flexible, customizable banner component that can be used throughout your website to highlight important content.

## Features

### 🎨 Background Options
- **Theme Aware**: Automatically adapts to light/dark mode
- **Custom Color**: Choose any color using hex codes (e.g., #1e40af)
- **Gradient**: Create beautiful gradients with two colors
- **Background Image**: Use images with adjustable overlay opacity

### 📐 Layout Types
1. **Split Screen** (Like the Porsche example)
   - Text on one side, image on the other
   - Image can be positioned left or right
   - Perfect for highlighting with visuals

2. **Centered**
   - Content centered on the page
   - Great for announcements or hero sections

3. **Full Width**
   - Text overlays the background
   - Ideal for dramatic hero sections with background images

### 📏 Size Options
- Small: `py-12 md:py-16`
- Medium: `py-16 md:py-24`
- Large: `py-24 md:py-32`
- Full Height: `min-h-screen` - Takes entire viewport

### 🖼️ Image Settings
- Enable/disable image display
- Choose image position (left/right for split layout)
- Upload any image from media library

### 🔘 Button Options
- Enable/disable button
- Custom button text and URL
- Three button styles:
  - **Solid**: Filled button (default)
  - **Outline**: Border only
  - **Ghost**: Text only with hover effect
- Open in new tab option

### 🎯 Text Color Control
- **Auto**: Smart color selection based on background
- **Always White**: Force white text
- **Always Dark**: Force dark text

## Usage Examples

### Split Screen Banner (Like the image)
```
Layout Type: Split Screen
Background Type: Gradient
Gradient From: #1e40af (blue)
Gradient To: #7c3aed (purple)
Image: Enable ✓
Image Position: Right
Button: Enable ✓
Size: Medium
```

### Simple Announcement Banner
```
Layout Type: Centered
Background Type: Theme Aware
Size: Small
Button: Disable
```

### Full Hero with Background Image
```
Layout Type: Full Width
Background Type: Image
Overlay Opacity: 0.5
Text Color: Always White
Size: Full Height
Button: Enable ✓
```

## Removed Features
❌ Old confusing "split/card/modern" theme options
❌ Hardcoded blue gradients
❌ Icon/iconText fields (simplified focus on content)
❌ Complex nested style options

## New Simplified Structure
✅ Clear layout choices
✅ Full color control
✅ Optional everything (image, button, description)
✅ Theme-aware by default
✅ Matches modern design patterns
