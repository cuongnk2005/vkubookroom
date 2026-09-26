import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { CheckCircle2, Calendar, Clock, MapPin, ArrowRight } from 'lucide-react-native';

export default function BookingConfirmationScreen() {
  const router = useRouter();
  const { roomName, date, timeSlot } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentWrap}>
        {/* Ticket Card */}
        <View style={styles.ticketCard}>
          <View style={styles.iconCircle}>
            <CheckCircle2 size={44} color="#16A34A" />
          </View>

          <Text style={styles.title}>Reservation Confirmed!</Text>
          <Text style={styles.subtitle}>
            Your study space has been successfully booked. Please arrive on time.
          </Text>

          {/* Ticket Details */}
          <View style={styles.ticketDetails}>
            <View style={styles.detailRow}>
              <View style={styles.detailIconBg}>
                <MapPin size={16} color="#4F46E5" />
              </View>
              <View style={styles.detailTextCol}>
                <Text style={styles.detailLabel}>Study Room</Text>
                <Text style={styles.detailValue}>{roomName || 'Selected Room'}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.detailRow}>
              <View style={styles.detailIconBg}>
                <Calendar size={16} color="#4F46E5" />
              </View>
              <View style={styles.detailTextCol}>
                <Text style={styles.detailLabel}>Reservation Date</Text>
                <Text style={styles.detailValue}>{date || 'Today'}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.detailRow}>
              <View style={styles.detailIconBg}>
                <Clock size={16} color="#4F46E5" />
              </View>
              <View style={styles.detailTextCol}>
                <Text style={styles.detailLabel}>Time Window</Text>
                <Text style={styles.detailValue}>{timeSlot || 'Scheduled Slot'}</Text>
              </View>
            </View>
          </View>

          {/* Actions */}
          <Pressable 
            style={styles.primaryBtn} 
            onPress={() => router.replace('/(tabs)/bookings')}
          >
            <Text style={styles.primaryBtnText}>View My Bookings</Text>
            <ArrowRight size={18} color="#FFFFFF" style={{ marginLeft: 8 }} />
          </Pressable>

          <Pressable 
            style={styles.secondaryBtn} 
            onPress={() => router.replace('/(tabs)')}
          >
            <Text style={styles.secondaryBtnText}>Book Another Room</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    padding: 20,
  },
  contentWrap: {
    width: '100%',
    alignItems: 'center',
  },
  ticketCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 24,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    ...Platform.select({
      ios: {
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.08,
        shadowRadius: 20,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F0FDF4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#DCFCE7',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  ticketDetails: {
    width: '100%',
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailIconBg: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  detailTextCol: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 12,
  },
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4F46E5',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 100,
    marginBottom: 10,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  secondaryBtn: {
    paddingVertical: 12,
    alignItems: 'center',
    width: '100%',
  },
  secondaryBtnText: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: '600',
  },
});
