import React from "react";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { TabBar, TabItem } from "../components/TabBar";
import { useCart } from "../store/hooks";
import { TodoBox } from "../components/TodoBox";

const EMOJI: Record<string, string> = { Home: "🏠", Categories: "🗂️", Cart: "🛒", Account: "👤" };

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { totalQuantity } = useCart();
// TODO BT7.1a: items: TabItem[] = state.routes.map(...)  → { key, label, emoji }
//   label = descriptors[route.key].options.title ?? route.name ; emoji = EMOJI[route.name]
<TodoBox></TodoBox>
  const items: TabItem[] = state.routes.map((route) => ({
    key: route.key,
    label: descriptors[route.key].options.title ?? route.name,
    emoji: EMOJI[route.name],
    badge: route.name === "Cart" ? totalQuantity : undefined,
  }));
// TODO BT7.1a: onPress(key): tìm route; navigation.emit({ type: "tabPress", target: route.key, canPreventDefault: true })
  const onPress = (key: string) => {
    const route = state.routes.find((r) => r.key === key);
    if (!route) return;
    const isFocused = state.routes[state.index].key === key;
    const event = navigation.emit({ type: "tabPress", target: route.key, canPreventDefault: true });
    if (!isFocused && !event.defaultPrevented) navigation.navigate(route.name);
  };
// TODO BT7.1a: return <TabBar items={items} activeKey={state.routes[state.index].key} onPress={onPress} />
  return <TabBar items={items} activeKey={state.routes[state.index].key} onPress={onPress} />;
}
