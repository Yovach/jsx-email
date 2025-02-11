type paddingType = string | number | undefined;
interface paddingProperties {
  padding: paddingType;
  paddingBottom?: paddingType;
  paddingLeft?: paddingType;
  paddingRight?: paddingType;
  paddingTop?: paddingType;
}

/**
 * converts padding value to `px` equivalent.
 * @example "1em" => 16
 */
export function convertToPx(value: paddingType) {
  let px = 0;

  if (!value) {
    return px;
  }

  if (typeof value === 'number') {
    return value;
  }

  const matches = value.match(/^([\d.]+)(px|em|rem|%)$/);

  if (matches && matches.length === 3) {
    const numValue = parseFloat(matches[1]);
    const unit = matches[2];

    switch (unit) {
      case 'px':
        return numValue;
      case 'em':
      case 'rem':
        px = numValue * 16;
        return px;
      case '%':
        px = (numValue / 100) * 600;
        return px;
      default:
        return numValue;
    }
  } else {
    return 0;
  }
}

/**
 * Parses all the values out of a padding string to get the value for all padding props in `px`
 * @example e.g. "10px" => pt: 10, pr: 10, pb: 10, pl: 10
 */
export function parsePadding({
  padding = '',
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft
}: paddingProperties) {
  let pt = 0;
  let pr = 0;
  let pb = 0;
  let pl = 0;

  if (typeof padding === 'number') {
    pt = padding;
    pr = padding;
    pb = padding;
    pl = padding;
  } else {
    const values = padding.split(/\s+/);

    switch (values.length) {
      case 1:
        pt = convertToPx(values[0]);
        pr = convertToPx(values[0]);
        pb = convertToPx(values[0]);
        pl = convertToPx(values[0]);
        break;
      case 2:
        pt = convertToPx(values[0]);
        pb = convertToPx(values[0]);
        pr = convertToPx(values[1]);
        pl = convertToPx(values[1]);
        break;
      case 3:
        pt = convertToPx(values[0]);
        pr = convertToPx(values[1]);
        pl = convertToPx(values[1]);
        pb = convertToPx(values[2]);
        break;
      case 4:
        pt = convertToPx(values[0]);
        pr = convertToPx(values[1]);
        pb = convertToPx(values[2]);
        pl = convertToPx(values[3]);
        break;
      default:
        break;
    }
  }

  return {
    pb: paddingBottom ? convertToPx(paddingBottom) : pb,
    pl: paddingLeft ? convertToPx(paddingLeft) : pl,
    pr: paddingRight ? convertToPx(paddingRight) : pr,
    pt: paddingTop ? convertToPx(paddingTop) : pt
  };
}
