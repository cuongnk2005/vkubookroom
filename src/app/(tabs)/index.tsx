import React, { useState, useCallback } from 'react';
import { FlatList, StyleSheet, View, Text, Pressable, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { Bell, Sparkles, SlidersHorizontal, RefreshCw, Users, X } from 'lucide-react-native';

import { Room } from '../../data/mockRooms';
import { fetchRooms } from '../../services/roomService';
import { RoomCard } from '../../components/RoomCard';
import { SearchBar } from '../../components/SearchBar';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';

const BUILDINGS = ['All Spaces', 'Building A3', 'Building B1', 'Main Library', 'Innovation Center', 'Student Union'];

interface CapacityOption {
  id: string;
  label: string;
  min: number;
  max: number;
}

const CAPACITY_OPTIONS: CapacityOption[] = [
  { id: 'all', label: 'All Seats', min: 1, max: 999 },
  { id: '1-10', label: '1 - 10 seats', min: 1, max: 10 },
  { id: '10-20', label: '10 - 20 seats', min: 10, max: 20 },
  { id: '20-35', label: '20 - 35 seats', min: 20, max: 35 },
  { id: '35+', label: '35+ seats', min: 35, max: 999 },
];

export default function BrowseRoomsScreen() {
  const [query, setQuery] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState('All Spaces');
  const [selectedCapacity, setSelectedCapacity] = useState('all');
  const { columns, cardWidth } = useResponsiveLayout();
  const router = useRouter();

  const { data: rooms = [], isLoading, isError, refetch, isRefetching } = useQuery({
    queryKey: ['rooms'],
    queryFn: fetchRooms,
  });

  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleResetFilters = () => {
    setQuery('');
    setSelectedBuilding('All Spaces');
    setSelectedCapacity('all');
  };

  // Multi-parameter filter (Search query + Building + Capacity Range)
  const filteredRooms = rooms.filter(room => {
    const matchesQuery = room.name.toLowerCase().includes(query.toLowerCase()) || 
                         room.building.toLowerCase().includes(query.toLowerCase());
    const matchesBuilding = selectedBuilding === 'All Spaces' || room.building === selectedBuilding;
    
    const capOption = CAPACITY_OPTIONS.find(c => c.id === selectedCapacity) || CAPACITY_OPTIONS[0];
    const matchesCapacity = selectedCapacity === 'all' || 
                            (room.capacity >= capOption.min && room.capacity <= capOption.max);

    return matchesQuery && matchesBuilding && matchesCapacity;
  });

  const hasActiveFilters = query.length > 0 || selectedBuilding !== 'All Spaces' || selectedCapacity !== 'all';

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Sleek App Top Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatarWrap}>
            <Text style={styles.avatarText}>ST</Text>
            <View style={styles.onlineBadge} />
          </View>
          <View>
            <Text style={styles.greeting}>Welcome back 👋</Text>
            <Text style={styles.headerTitle}>Find Study Space</Text>
          </View>
        </View>

        <Pressable style={styles.iconBtn}>
          <Bell size={20} color="#0F172A" />
          <View style={styles.notifDot} />
        </Pressable>
      </View>
      
      {/* Real-time Search */}
      <SearchBar onSearch={setQuery} value={query} />
      
      {/* Multi-parameter Filter Section */}
      <View style={styles.filterSection}>
        {/* Filter 1: Building Chips */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.filterScroll}
        >
          {BUILDINGS.map(b => {
            const isActive = selectedBuilding === b;
            return (
              <Pressable 
                key={b}
                style={[styles.chip, isActive && styles.chipActive]}
                onPress={() => setSelectedBuilding(b)}
              >
                {isActive && <Sparkles size={12} color="#FFFFFF" style={{ marginRight: 4 }} />}
                <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
                  {b}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Filter 2: Capacity (Seats) Range Chips */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={[styles.filterScroll, styles.capacityScroll]}
        >
          {CAPACITY_OPTIONS.map(c => {
            const isActive = selectedCapacity === c.id;
            return (
              <Pressable 
                key={c.id}
                style={[styles.chip, styles.capacityChip, isActive && styles.capacityChipActive]}
                onPress={() => setSelectedCapacity(c.id)}
              >
                <Users size={12} color={isActive ? '#FFFFFF' : '#64748B'} style={{ marginRight: 5 }} />
                <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
                  {c.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* Results Header Count */}
      <View style={styles.resultsInfoRow}>
        <Text style={styles.resultsCount}>
          {filteredRooms.length} {filteredRooms.length === 1 ? 'room' : 'rooms'} available
        </Text>
        {hasActiveFilters && (
          <Pressable onPress={handleResetFilters} style={styles.resetFilterBtn} hitSlop={8}>
            <X size={12} color="#4F46E5" style={{ marginRight: 4 }} />
            <Text style={styles.resetFilterText}>Clear filters</Text>
          </Pressable>
        )}
      </View>

      {isLoading && !isRefetching ? (
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color="#4F46E5" />
          <Text style={styles.loadingText}>Loading available spaces...</Text>
        </View>
      ) : isError ? (
        <View style={styles.centerContent}>
          <Text style={styles.errorText}>Failed to load rooms.</Text>
          <Pressable onPress={() => refetch()} style={styles.retryBtn}>
            <RefreshCw size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
            <Text style={styles.retryText}>Retry</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={filteredRooms}
          key={columns}
          numColumns={columns}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <RoomCard 
              room={item} 
              width={cardWidth} 
              onPress={() => router.push(`/room/${item.id}`)}
              index={index}
            />
          )}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={columns > 1 ? styles.columnWrapper : undefined}
          ItemSeparatorComponent={() => (columns === 1 ? <View style={{ height: 4 }} /> : null)}
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={onRefresh} tintColor="#4F46E5" />
          }
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIconBg}>
                <SlidersHorizontal size={36} color="#94A3B8" />
              </View>
              <Text style={styles.emptyTitle}>No matching rooms</Text>
              <Text style={styles.emptySubtitle}>
                No rooms match the selected building, capacity, and keyword combination.
              </Text>
              <Pressable 
                style={styles.clearAllBtn} 
                onPress={handleResetFilters}
              >
                <Text style={styles.clearAllBtnText}>Reset All Filters</Text>
              </Pressable>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarWrap: {
    position: 'relative',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 16,
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#22C55E',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  greeting: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600',
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  iconBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    position: 'relative',
  },
  notifDot: {
    position: 'absolute',
    top: 10,
    right: 11,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  filterSection: {
    paddingVertical: 6,
  },
  filterScroll: {
    paddingHorizontal: 20,
    gap: 8,
  },
  capacityScroll: {
    marginTop: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 100,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  chipActive: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  capacityChip: {
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  capacityChipActive: {
    backgroundColor: '#0F172A',
    borderColor: '#0F172A',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  chipText: {
    color: '#64748B',
    fontWeight: '600',
    fontSize: 13,
  },
  chipTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  resultsInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 4,
  },
  resultsCount: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  resetFilterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resetFilterText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4F46E5',
  },
  listContent: {
    padding: 20,
    paddingTop: 12,
    paddingBottom: 30,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 15,
    marginBottom: 12,
    fontWeight: '600',
  },
  retryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4F46E5',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
  },
  retryText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  emptyIconBg: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  clearAllBtn: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 100,
  },
  clearAllBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
});
