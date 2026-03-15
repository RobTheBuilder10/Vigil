import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { ScreenContainer, Card, Button, SectionHeader, Divider } from '../../components';
import { useApp } from '../../context/AppContext';
import { BrotherhoodPost } from '../../types';

const POST_TYPES = [
  { id: 'prayer_request', label: 'Prayer Request', icon: 'hand-left-outline' },
  { id: 'testimony', label: 'Testimony', icon: 'megaphone-outline' },
  { id: 'encouragement', label: 'Encouragement', icon: 'heart-outline' },
] as const;

const REACTIONS = [
  { id: 'pray', label: 'Pray', icon: 'hand-left-outline' },
  { id: 'standWithYou', label: 'Stand With You', icon: 'shield-outline' },
  { id: 'amen', label: 'Amen', icon: 'checkmark-circle-outline' },
] as const;

// Sample posts for demo
const samplePosts: BrotherhoodPost[] = [
  {
    id: '1',
    userId: 'u1',
    userName: 'Marcus',
    type: 'prayer_request',
    content: 'Brothers, pray for strength this week. Facing a major decision at work that will affect my family. Need wisdom and courage.',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    reactions: { pray: 12, standWithYou: 8, amen: 5 },
  },
  {
    id: '2',
    userId: 'u2',
    userName: 'David',
    type: 'testimony',
    content: '90 days sober today. God has been my rock. This community kept me accountable. Keep fighting, brothers.',
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    reactions: { pray: 3, standWithYou: 24, amen: 31 },
  },
  {
    id: '3',
    userId: 'u3',
    userName: 'James',
    type: 'encouragement',
    content: '"Watch ye, stand fast in the faith, quit you like men, be strong." - 1 Cor 16:13. Stay vigilant today.',
    createdAt: new Date(Date.now() - 14400000).toISOString(),
    reactions: { pray: 2, standWithYou: 15, amen: 18 },
  },
];

export const BrotherhoodScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { brotherhoodPosts, addBrotherhoodPost, reactToPost } = useApp();
  const [showCompose, setShowCompose] = useState(false);
  const [composeType, setComposeType] = useState<BrotherhoodPost['type']>('prayer_request');
  const [composeText, setComposeText] = useState('');
  const [activeTab, setActiveTab] = useState<'feed' | 'groups'>('feed');

  const allPosts = [...brotherhoodPosts, ...samplePosts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const handlePost = () => {
    if (composeText.trim().length === 0) return;
    if (composeText.length > 300) {
      Alert.alert('Too Long', 'Posts are limited to 300 characters.');
      return;
    }
    const post: BrotherhoodPost = {
      id: Date.now().toString(),
      userId: 'me',
      userName: 'You',
      type: composeType,
      content: composeText.trim(),
      createdAt: new Date().toISOString(),
      reactions: { pray: 0, standWithYou: 0, amen: 0 },
    };
    addBrotherhoodPost(post);
    setComposeText('');
    setShowCompose(false);
  };

  const getTimeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const hours = Math.floor(diff / 3600000);
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <ScreenContainer>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>BROTHERHOOD</Text>
        <TouchableOpacity
          style={styles.composeBtn}
          onPress={() => setShowCompose(!showCompose)}
        >
          <Ionicons name={showCompose ? 'close' : 'add'} size={22} color={colors.bronze} />
        </TouchableOpacity>
      </View>

      {/* Tab Toggle */}
      <View style={styles.tabToggle}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'feed' && styles.tabActive]}
          onPress={() => setActiveTab('feed')}
        >
          <Text style={[styles.tabText, activeTab === 'feed' && styles.tabTextActive]}>FEED</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'groups' && styles.tabActive]}
          onPress={() => setActiveTab('groups')}
        >
          <Text style={[styles.tabText, activeTab === 'groups' && styles.tabTextActive]}>GROUPS</Text>
        </TouchableOpacity>
      </View>

      {/* Compose */}
      {showCompose && (
        <Card style={styles.composeCard}>
          <View style={styles.typeRow}>
            {POST_TYPES.map(type => (
              <TouchableOpacity
                key={type.id}
                style={[styles.typeBtn, composeType === type.id && styles.typeBtnActive]}
                onPress={() => setComposeType(type.id)}
              >
                <Ionicons
                  name={type.icon as any}
                  size={16}
                  color={composeType === type.id ? colors.bronze : colors.textMuted}
                />
                <Text style={[styles.typeLabel, composeType === type.id && styles.typeLabelActive]}>
                  {type.label.toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TextInput
            style={styles.composeInput}
            placeholder="Share with your brothers..."
            placeholderTextColor={colors.textMuted}
            value={composeText}
            onChangeText={setComposeText}
            maxLength={300}
            multiline
          />
          <View style={styles.composeFooter}>
            <Text style={styles.charCount}>{composeText.length}/300</Text>
            <Button title="POST" onPress={handlePost} size="small" disabled={!composeText.trim()} />
          </View>
        </Card>
      )}

      {activeTab === 'feed' ? (
        <FlatList
          data={allPosts}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Card style={styles.postCard}>
              <View style={styles.postHeader}>
                <View style={styles.postUserInfo}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{item.userName[0]}</Text>
                  </View>
                  <View>
                    <Text style={styles.userName}>{item.userName}</Text>
                    <Text style={styles.postTime}>{getTimeAgo(item.createdAt)}</Text>
                  </View>
                </View>
                <View style={styles.postTypeBadge}>
                  <Text style={styles.postTypeText}>
                    {item.type === 'prayer_request' ? 'PRAYER' : item.type === 'testimony' ? 'TESTIMONY' : 'ENCOURAGE'}
                  </Text>
                </View>
              </View>

              <Text style={styles.postContent}>{item.content}</Text>

              <View style={styles.reactionsRow}>
                {REACTIONS.map(reaction => (
                  <TouchableOpacity
                    key={reaction.id}
                    style={[
                      styles.reactionBtn,
                      item.userReaction === reaction.id && styles.reactionBtnActive,
                    ]}
                    onPress={() => reactToPost(item.id, reaction.id)}
                  >
                    <Ionicons
                      name={reaction.icon as any}
                      size={14}
                      color={item.userReaction === reaction.id ? colors.bronze : colors.textMuted}
                    />
                    <Text style={[
                      styles.reactionLabel,
                      item.userReaction === reaction.id && styles.reactionLabelActive,
                    ]}>
                      {reaction.label}
                    </Text>
                    {item.reactions[reaction.id] > 0 && (
                      <Text style={styles.reactionCount}>{item.reactions[reaction.id]}</Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </Card>
          )}
          contentContainerStyle={styles.feedContent}
        />
      ) : (
        <View style={styles.groupsContainer}>
          <Card style={styles.createGroupCard} onPress={() => navigation.navigate('CreateBrotherhood')}>
            <Ionicons name="add-circle-outline" size={32} color={colors.bronze} />
            <Text style={styles.createGroupTitle}>CREATE A BROTHERHOOD</Text>
            <Text style={styles.createGroupDesc}>
              Start a private group for accountability and growth.
            </Text>
          </Card>

          <SectionHeader title="YOUR BROTHERHOODS" />
          <Card style={styles.emptyGroup}>
            <Ionicons name="people-outline" size={32} color={colors.textMuted} />
            <Text style={styles.emptyGroupText}>No groups yet. Create or join a Brotherhood.</Text>
          </Card>
        </View>
      )}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.md,
    marginBottom: spacing.md,
  },
  title: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  composeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabToggle: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.sm,
    padding: 3,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: borderRadius.sm - 2,
  },
  tabActive: {
    backgroundColor: colors.gunmetal,
  },
  tabText: {
    ...typography.labelSmall,
    color: colors.textMuted,
  },
  tabTextActive: {
    color: colors.textPrimary,
  },
  composeCard: {
    marginBottom: spacing.md,
    borderColor: colors.bronze,
  },
  typeRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: spacing.md,
  },
  typeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  typeBtnActive: {
    borderColor: colors.bronze,
    backgroundColor: 'rgba(176, 141, 87, 0.1)',
  },
  typeLabel: {
    ...typography.labelSmall,
    color: colors.textMuted,
    fontSize: 9,
  },
  typeLabelActive: {
    color: colors.bronze,
  },
  composeInput: {
    ...typography.body,
    color: colors.textPrimary,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  composeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  charCount: {
    ...typography.caption,
    color: colors.textMuted,
  },
  feedContent: {
    gap: 10,
    paddingBottom: 40,
  },
  postCard: {
    gap: spacing.sm,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  postUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.gunmetal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    ...typography.label,
    color: colors.bronze,
    fontSize: 14,
  },
  userName: {
    ...typography.bodySmall,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  postTime: {
    ...typography.caption,
    color: colors.textMuted,
  },
  postTypeBadge: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: borderRadius.sm,
    backgroundColor: 'rgba(176, 141, 87, 0.1)',
  },
  postTypeText: {
    ...typography.labelSmall,
    color: colors.bronze,
    fontSize: 9,
  },
  postContent: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  reactionsRow: {
    flexDirection: 'row',
    gap: 8,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  reactionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  reactionBtnActive: {
    borderColor: colors.bronze,
    backgroundColor: 'rgba(176, 141, 87, 0.1)',
  },
  reactionLabel: {
    ...typography.labelSmall,
    color: colors.textMuted,
    fontSize: 9,
  },
  reactionLabelActive: {
    color: colors.bronze,
  },
  reactionCount: {
    ...typography.labelSmall,
    color: colors.textSecondary,
    fontSize: 10,
  },
  groupsContainer: {
    flex: 1,
  },
  createGroupCard: {
    alignItems: 'center',
    gap: 8,
    borderStyle: 'dashed',
  },
  createGroupTitle: {
    ...typography.label,
    color: colors.bronze,
  },
  createGroupDesc: {
    ...typography.bodySmall,
    color: colors.textMuted,
    textAlign: 'center',
  },
  emptyGroup: {
    alignItems: 'center',
    gap: 8,
  },
  emptyGroupText: {
    ...typography.bodySmall,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
