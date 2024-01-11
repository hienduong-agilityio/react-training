interface ISortSvg {
  fillColor: string;

  status?: string;
}

export default function SortSvg({ fillColor, status = 'default' }: ISortSvg) {
  return (
    <svg viewBox="0 0 512 512" width="18" xmlns="http://www.w3.org/2000/svg">
      {status === 'ascending' ? (
        <polygon
          fill={fillColor}
          points="384 433.373 384 160 352 160 352 434.51 282.177 364.687 259.55 387.313 367.432 495.196 475.313 387.313 452.687 364.687 384 433.373"
          className="ascending__icon"
        ></polygon>
      ) : status === 'descending' ? (
        <polygon
          fill={fillColor}
          points="159.432 17.372 51.55 125.255 74.177 147.882 144 78.059 144 352 176 352 176 79.195 244.687 147.882 267.313 125.255 159.432 17.372"
          className="descending__icon"
        ></polygon>
      ) : (
        <>
          <polygon
            fill={fillColor}
            points="384 433.373 384 160 352 160 352 434.51 282.177 364.687 259.55 387.313 367.432 495.196 475.313 387.313 452.687 364.687 384 433.373"
            className="ascending__icon"
          ></polygon>
          <polygon
            fill={fillColor}
            points="159.432 17.372 51.55 125.255 74.177 147.882 144 78.059 144 352 176 352 176 79.195 244.687 147.882 267.313 125.255 159.432 17.372"
            className="descending__icon"
          ></polygon>
        </>
      )}
    </svg>
  );
}
