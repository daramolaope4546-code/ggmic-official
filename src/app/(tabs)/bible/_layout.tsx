import { Stack } from 'expo-router';

/**
 * Bible tab stack. Each tab owns a nested headerless Stack so pushed screens
 * (books, chapters, reader, search) animate within the tab.
 */
export default function BibleStackLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}