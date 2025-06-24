import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

interface CandidateBarProps {
  candidates: string[];
  onCandidatePress: (candidate: string) => void;
  inputText: string;
}

const CandidateBar: React.FC<CandidateBarProps> = ({
  candidates,
  onCandidatePress,
  inputText,
}) => {
  if (!inputText) {
    return (
      <View style={styles.container}>
        <Text style={styles.inputText}>请输入拼音</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.inputText}>{inputText}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.candidatesContainer}>
        {candidates.length > 0 ? (
          candidates.map((candidate, index) => (
            <TouchableOpacity
              key={index}
              style={styles.candidateItem}
              onPress={() => onCandidatePress(candidate)}>
              <Text style={styles.candidateText}>{candidate}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noResultText}>无匹配结果</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: '#F3F4F6',
    borderRadius: 5,
  },
  inputText: {
    paddingHorizontal: 10,
    paddingTop: 5,
    fontSize: 14,
    color: '#4B5563',
  },
  candidatesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  candidateItem: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 2,
  },
  candidateText: {
    fontSize: 16,
    color: '#1F2937',
  },
  noResultText: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 16,
    color: '#6B7280',
    fontStyle: 'italic',
  },
});

export default CandidateBar; 