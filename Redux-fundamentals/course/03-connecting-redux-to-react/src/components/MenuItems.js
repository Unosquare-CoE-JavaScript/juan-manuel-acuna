import { Stack } from "@twilio-paste/stack";
import { MenuItemContainer } from "../containers/MenuItemContainer";
// import MenuItem from './MenuItem';

export const MenuItems = ({ items }) => {
	return (
		<Stack orientation="vertical" spacing="space60">
			{items.map((item) => (
				// <MenuItem {...item} key={item.uuid} />
				<MenuItemContainer {...item} key={item.uuid} />
			))}
		</Stack>
	);
};
