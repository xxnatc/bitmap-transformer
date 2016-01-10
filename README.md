# bitmap-transformer
Reads and performs color transform a Windows BMP

Code Fellows 401 JS assignment by [Natalie Chow](https://github.com/xxnatc), [Yueyue Qin](https://github.com/Yueyue07), and [Sabrina Tee](https://github.com/sabbyt)

## Command Line Utility
### Getting started
The transformer can be called from the command line with the following format:
```
node index.js <file_path> [<transform>[=<parameter>]]
```
`<file_path>` points to the bitmap file relative to the root directory.

The optional `<transform>` can be used to specify a single color transform method. If no `<transform>` argument is passed, the default transformation of `inverse` will be used. Some `<transform>` takes a `<parameter>`, which is also optional. See below for a list of methods and their details of implementation.

### Helper command
To see a list of color transform methods available, type in the command line:
```
node index.js help
```

## Color Transform Methods
Our color transform methods work on both 24-bit (RGB) and 32-bit (RGBA) colordepth, as well as both paletted and non-paletted bitmaps. The alpha value in 32-bit color will not be modified to retain the original transparency.

### Inverse Color: `inverse`
`inverse` is the default transform. It flips each of the RGB value on the spectrum such that `(R, G, B)` becomes `(255 - R, 255 - G, 255 - B)`.

### Colorscales: `redscale`, `greenscale`, `bluescale`
These colorscales work the same way - for each pixel, a specific color value (R/G/B) is multiplied by a constant. If the multiplied value exceeds 255, the fractional value is used. The multiplier is defaulted to be 2, but can be customized by passing it as a parameter:
```
node index.js img/mario.bmp bluescale=4.3
```

### Grayscale: `grayscale`, `lightness`, `luminosity`
##### Average grayscale
The average `grayscale`, as suggested by its name, averages the RGB value at each pixel and replaces each with `(R + G + B) / 3`.

##### Lightness
The `lightness` transform takes the average of the most and least prominent colors. The RGB values are then assigned to be `(max + min) / 2` where `max = max(R, G, B)` and `min = min(R, G, B)`.

##### Luminosity
`luminosity` uses a weighted average to account for human perception. Green is given a large proportion because we are more sensitive to green light. The RGB value is calculated to be `0.2125R + 0.7154G + 0.0721B`

### Other: `scatterbrain`
##### Scatterbrain
`scatterbrain` randomizes the RGB values.
