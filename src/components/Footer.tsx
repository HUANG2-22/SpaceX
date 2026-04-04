type Props = { text: string }

export function Footer({ text }: Props) {
  return (
    <footer className="site-footer">
      <p>{text}</p>
    </footer>
  )
}
