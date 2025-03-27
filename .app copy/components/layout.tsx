
type LayoutProps = {
	children: React.ReactNode
}

export const Layout = (props: LayoutProps) => {
	return <div className="h-screen w-full bg-gray-700">
		{ props.children }
	</div>
}
