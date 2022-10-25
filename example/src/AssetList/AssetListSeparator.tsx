import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from './Button';
import { useTemplateValue, WishList } from 'wishlist';
import { useWorkletCallback } from 'react-native-reanimated';

type AssetListSeparatorProps = {
  onExpand: () => void;
  onEdit: () => void;
};

type AssetListSeparatorType = {
  type: 'asset-list-separator';
};

export function AssetListSeparator({
  onExpand,
  onEdit,
}: AssetListSeparatorProps) {
  const isEditing = useTemplateValue((item) => item.isEditing);
  const isNotEditing = useTemplateValue((item) => !item.isEditing);
  const expandButtonText = useTemplateValue((item: AssetListSeparatorType) =>
    item.isExpanded ? 'Less ↑' : 'More ↓',
  );
  const isExpanded = useTemplateValue(
    (item: AssetListSeparatorType) => item.isExpanded,
  );
  const editButtonText = useTemplateValue((item: AssetListSeparatorType) =>
    item.isEditing ? 'Done' : 'Edit',
  );

  const pinTitle = useTemplateValue(() => 'Pin');
  const hideTitle = useTemplateValue(() => 'Hide');

  const onPin = useWorkletCallback(() => {});
  const onHide = useWorkletCallback(() => {});

  return (
    <View style={styles.container}>
      <WishList.IF condition={isEditing}>
        <View style={styles.buttonGroup}>
          <Button
            nativeId="asset-list-pin"
            disabled
            onPress={onPin}
            text={pinTitle}
            active={false}
          />
          <View style={styles.margin} />
          <Button
            nativeId="asset-list-hide"
            disabled
            onPress={onHide}
            text={hideTitle}
            active={false}
          />
        </View>
      </WishList.IF>
      <WishList.IF condition={isNotEditing}>
        <Button
          active={false}
          text={expandButtonText}
          nativeId="asset-list-expand"
          onPress={onExpand}
        />
      </WishList.IF>

      {/* TODO: Replace with IF */}

      <WishList.IF condition={isExpanded}>
        <Button
          nativeId="asset-list-edit"
          text={editButtonText}
          onPress={onEdit}
          active={isEditing}
        />
      </WishList.IF>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 19,
    paddingVertical: 5,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 0.4,
    textAlign: 'left',
  },
  balance: {
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: 0.4,
    textAlign: 'right',
  },
  buttonGroup: {
    flexDirection: 'row',
  },
  margin: {
    width: 8,
  },
});
