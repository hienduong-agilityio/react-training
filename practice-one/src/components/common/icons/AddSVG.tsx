interface AddSVG {
  fillColor?: string;
}

// TODO: Update comments for components
export default function AddSVG({ fillColor = 'none' }: AddSVG) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill={fillColor}>
      <path
        d="M5.16663 11.8333V6.83332H0.166626V5.16666H5.16663V0.166656H6.83329V5.16666H11.8333V6.83332H6.83329V11.8333H5.16663Z"
        fill="white"
      />
    </svg>
  );
}
