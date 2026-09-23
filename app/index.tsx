import React, { useCallback, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { fetchRandomQuote, Quote } from '../services/quotes';

export default function QuotesScreen() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadQuote = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const data = await fetchRandomQuote();

      setQuote(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to load a quote.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch the first quote when the app opens
  useEffect(() => {
    loadQuote();
  }, [loadQuote]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.smallTitle}>
            DAILY INSPIRATION
          </Text>

          <Text style={styles.title}>
            Quote of the Day
          </Text>

          <Text style={styles.subtitle}>
            A little inspiration for your day.
          </Text>
        </View>

        {/* Quote Card */}
        <View style={styles.quoteCard}>

          {loading ? (
            <View style={styles.centerContent}>
              <ActivityIndicator
                size="large"
                color="#2563EB"
              />

              <Text style={styles.loadingText}>
                Loading quote...
              </Text>
            </View>
          ) : error !== '' ? (
            <View style={styles.centerContent}>
              <Text style={styles.errorIcon}>
                !
              </Text>

              <Text style={styles.errorTitle}>
                Something went wrong
              </Text>

              <Text style={styles.errorText}>
                {error}
              </Text>
            </View>
          ) : quote ? (
            <View>
              <Text style={styles.quoteMark}>
                “
              </Text>

              <Text style={styles.quoteText}>
                {quote.quote}
              </Text>

              <Text style={styles.author}>
                — {quote.author}
              </Text>
            </View>
          ) : (
            <View style={styles.centerContent}>
              <Text style={styles.emptyTitle}>
                No quote available
              </Text>

              <Text style={styles.emptyText}>
                Try getting a new quote.
              </Text>
            </View>
          )}

        </View>

        {/* New Quote Button */}
        <Pressable
          style={[
            styles.button,
            loading && styles.buttonDisabled,
          ]}
          onPress={loadQuote}
          disabled={loading}
        >
          {loading ? (
            <View style={styles.buttonLoading}>
              <ActivityIndicator color="#FFFFFF" />

              <Text style={styles.buttonText}>
                Loading...
              </Text>
            </View>
          ) : (
            <Text style={styles.buttonText}>
              NEW QUOTE
            </Text>
          )}
        </Pressable>

        <Text style={styles.footer}>
          Powered by a public quote API
        </Text>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F6FA',
  },

  container: {
    flex: 1,
    width: '100%',
    maxWidth: 650,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 30,
  },

  header: {
    alignItems: 'center',
    marginBottom: 26,
  },

  smallTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#2563EB',
    letterSpacing: 1.5,
  },

  title: {
    marginTop: 6,
    fontSize: 30,
    fontWeight: '800',
    color: '#172033',
    textAlign: 'center',
  },

  subtitle: {
    marginTop: 7,
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },

  quoteCard: {
    minHeight: 270,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 28,
    justifyContent: 'center',
    marginBottom: 20,
  },

  quoteMark: {
    fontSize: 60,
    lineHeight: 60,
    fontWeight: '800',
    color: '#2563EB',
  },

  quoteText: {
    fontSize: 22,
    lineHeight: 34,
    fontWeight: '600',
    color: '#172033',
    marginTop: -5,
  },

  author: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
    marginTop: 20,
    textAlign: 'right',
  },

  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  loadingText: {
    marginTop: 12,
    color: '#6B7280',
    fontSize: 14,
  },

  errorIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FEE2E2',
    color: '#B91C1C',
    textAlign: 'center',
    lineHeight: 40,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 12,
  },

  errorTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#172033',
  },

  errorText: {
    marginTop: 7,
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 19,
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#172033',
  },

  emptyText: {
    marginTop: 7,
    fontSize: 13,
    color: '#6B7280',
  },

  button: {
    height: 52,
    borderRadius: 11,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonDisabled: {
    opacity: 0.7,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.5,
  },

  buttonLoading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  footer: {
    marginTop: 22,
    textAlign: 'center',
    fontSize: 12,
    color: '#9CA3AF',
  },
});