interface Props {
  name: string;
  color: string;
}

export function CategoryBadge({ name, color }: Props) {
  return (
    <span
      style={{
        backgroundColor: color + '22',
        color,
        border: `1px solid ${color}`,
        borderRadius: 9999,
        padding: '2px 8px',
        fontSize: 12,
        fontWeight: 600,
        whiteSpace: 'nowrap',
      }}
    >
      {name}
    </span>
  );
}
