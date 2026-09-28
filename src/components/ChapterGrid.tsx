import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useResponsive } from '@/hooks/useResponsive';
import { gridItemWidth } from '@/utils/layout';
import {
  colors,
  contentMaxWidth,
  fontSizes,
  fontWeights,
  minTouchTarget,
  radius,
  spacing,
} from '@/theme';

interface ChapterGridProps {
  totalChapters: number;
  currentChapter?: number;
  onSelect: (chapter: number) => void;
}

export function ChapterGrid({
  totalChapters,
  currentChapter,
  onSelect,
}: ChapterGridProps) {
  const { sp, isTablet, contentWidth } = useResponsive();
  const columns = isTablet ? 8 : 4;
  const gap = sp(spacing.sm);
  const usableContentWidth = Math.min(contentWidth, contentMaxWidth);
  const itemWidth = gridItemWidth(columns, gap, usableContentWidth);
  const itemH = sp(minTouchTarget);

  return (
    <View style={[styles.grid, { gap }]}>
      {Array.from({ length: totalChapters }, (_, i) => i + 1).map((ch) => (
        <Pressable
          key={ch}
          accessibilityLabel={`Chapter ${ch}`}
          accessibilityRole="button"
          onPress={() => onSelect(ch)}
          style={({ pressed }) => [
            styles.cell,
            {
              width: itemWidth,
              height: itemH,
              borderRadius: sp(radius.md),
            },
            ch === currentChapter && styles.cellActive,
            pressed && styles.pressed,
          ]}
        >
          <Text
            style={[
              styles.num,
              {
                fontSize: sp(fontSizes.body),
                color: ch === currentChapter ? colors.textOnPrimary : colors.textPrimary,
              },
            ]}
          >
            {ch}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  cellActive: {
    backgroundColor: colors.primary,
  },
  pressed: { opacity: 0.7 },
  num: {
    fontWeight: fontWeights.semibold,
  },
});
