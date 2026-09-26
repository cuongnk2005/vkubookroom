import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  User, 
  BookOpen, 
  Clock, 
  ShieldCheck, 
  Bell, 
  HelpCircle, 
  FileText, 
  LogOut, 
  ChevronRight,
  GraduationCap
} from 'lucide-react-native';

import { useBookingStore } from '../../store/useBookingStore';

export default function ProfileScreen() {
  const bookings = useBookingStore(state => state.bookings);

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out of your student account?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', style: 'destructive', onPress: () => {} }
      ]
    );
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Profile Hero Header */}
        <LinearGradient 
          colors={['#4F46E5', '#6366F1']} 
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>VKU</Text>
            </View>
            <View style={styles.verifiedIconWrap}>
              <ShieldCheck size={14} color="#FFFFFF" />
            </View>
          </View>
          
          <Text style={styles.userName}>Student Portal</Text>
          <Text style={styles.userEmail}>student@vku.udn.vn</Text>

          <View style={styles.badgeRow}>
            <View style={styles.universityBadge}>
              <GraduationCap size={13} color="#FFFFFF" />
              <Text style={styles.universityBadgeText}>IT & Communication (VKU)</Text>
            </View>
          </View>
        </LinearGradient>
        
        {/* Stats Row */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={[styles.statIconBg, { backgroundColor: '#EEF2FF' }]}>
              <BookOpen size={18} color="#4F46E5" />
            </View>
            <Text style={styles.statValue}>{bookings.length}</Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIconBg, { backgroundColor: '#F0FDF4' }]}>
              <Clock size={18} color="#16A34A" />
            </View>
            <Text style={styles.statValue}>{bookings.length * 2}h</Text>
            <Text style={styles.statLabel}>Studied</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIconBg, { backgroundColor: '#FEF3C7' }]}>
              <ShieldCheck size={18} color="#D97706" />
            </View>
            <Text style={styles.statValue}>100%</Text>
            <Text style={styles.statLabel}>Reliability</Text>
          </View>
        </View>

        {/* Menu Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Preferences</Text>
          
          <View style={styles.menuGroup}>
            <Pressable style={styles.menuItem}>
              <View style={[styles.menuIconBg, { backgroundColor: '#EEF2FF' }]}>
                <Bell size={18} color="#4F46E5" />
              </View>
              <Text style={styles.menuTitle}>Booking Notifications</Text>
              <ChevronRight size={18} color="#94A3B8" />
            </Pressable>

            <View style={styles.menuDivider} />

            <Pressable style={styles.menuItem}>
              <View style={[styles.menuIconBg, { backgroundColor: '#F0FDF4' }]}>
                <FileText size={18} color="#16A34A" />
              </View>
              <Text style={styles.menuTitle}>Campus Room Guidelines</Text>
              <ChevronRight size={18} color="#94A3B8" />
            </Pressable>

            <View style={styles.menuDivider} />

            <Pressable style={styles.menuItem}>
              <View style={[styles.menuIconBg, { backgroundColor: '#F8FAFC' }]}>
                <HelpCircle size={18} color="#64748B" />
              </View>
              <Text style={styles.menuTitle}>Help & Support Desk</Text>
              <ChevronRight size={18} color="#94A3B8" />
            </Pressable>
          </View>
        </View>

        {/* Logout Section */}
        <View style={styles.section}>
          <Pressable style={styles.logoutBtn} onPress={handleLogout}>
            <LogOut size={18} color="#EF4444" style={{ marginRight: 8 }} />
            <Text style={styles.logoutText}>Sign Out</Text>
          </Pressable>
          <Text style={styles.versionText}>Study Room Booking v1.0.0 • VKU Campus</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F8FAFC' 
  },
  scrollContent: {
    paddingBottom: 40,
  },
  heroCard: {
    margin: 20,
    borderRadius: 24,
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 6,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 14,
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  verifiedIconWrap: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: '#22C55E',
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  userName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
    marginBottom: 12,
  },
  badgeRow: {
    flexDirection: 'row',
  },
  universityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
  },
  universityBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    ...Platform.select({
      ios: {
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  statIconBg: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeading: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
    marginLeft: 4,
  },
  menuGroup: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  menuIconBg: {
    width: 34,
    height: 34,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginLeft: 62,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF2F2',
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FEE2E2',
    marginBottom: 16,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#EF4444',
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '500',
  },
});
