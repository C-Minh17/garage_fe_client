interface ITag {
  color?: any,
  style?: any,
  children: React.ReactNode
  onClick?: () => void
}

const Tag = ({ color, children, style, onClick }: ITag) => {
  const colorMap = {
    magenta: { bg: "#fff0f6", text: "#c41d7f", border: "#ffadd2" },
    red: { bg: "#fff1f0", text: "#cf1322", border: "#ffa39e" },
    volcano: { bg: "#fff2e8", text: "#d4380d", border: "#ffbb96" },
    orange: { bg: "#fff7e6", text: "#d46b08", border: "#ffd591" },
    gold: { bg: "#fffbe6", text: "#d48806", border: "#ffe58f" },
    lime: { bg: "#fcffe6", text: "#7cb305", border: "#eaff8f" },
    green: { bg: "#f6ffed", text: "#389e0d", border: "#b7eb8f" },
    cyan: { bg: "#e6fffb", text: "#08979c", border: "#87e8de" },
    blue: { bg: "#e6f7ff", text: "#096dd9", border: "#91d5ff" },
    geekblue: { bg: "#f0f5ff", text: "#1d39c4", border: "#adc6ff" },
    purple: { bg: "#f9f0ff", text: "#531dab", border: "#d3adf7" },
  };

  const colorTag = (colorMap as any)[color] || colorMap.blue

  const styleTag = {
    display: "inline-flex",
    alignItems: "center",
    fontSize: "13px",
    fontWeight: 500,
    borderRadius: "4px",
    padding: "1px 8px",
    border: `1px solid ${colorTag.border}`,
    backgroundColor: colorTag.bg,
    color: colorTag.text,
    ...style
  };

  return <span onClick={onClick} style={styleTag}>{children}</span>;
}

export default Tag
