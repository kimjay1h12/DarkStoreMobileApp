import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useColors} from '../hooks';
import Typography from './Typography';

interface VerticalStepperProps {
  steps: string[];
  activeSteps: number[];
  onPress: (index: number) => void;
}

const VerticalStepper: React.FC<VerticalStepperProps> = ({
  steps,
  activeSteps,
  onPress,
}) => {
  const colors = useColors();
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
    },
    stepContainer: {
      // marginBottom: 30,
    },
    step: {
      flexDirection: 'row-reverse',
      alignItems: 'center',

      // paddingBottom: 5,
      gap: 20,
    },
    activeStep: {},
    activeCircle: {},
    stepCircle: {
      width: 25,
      height: 25,
      borderRadius: 20,
      backgroundColor: colors.primary.main,
      alignItems: 'center',
      justifyContent: 'center',
    },
    stepCircleInactive: {
      width: 25,
      height: 25,
      borderRadius: 30,
      // borderWidth: 2,
      backgroundColor: '#aaa',
      alignItems: 'center',
      justifyContent: 'center',
    },
    stepCircleText: {
      color: '#ffffff',
    },
    stepTextContainer: {
      marginLeft: 15,
    },
    stepLabel: {
      fontSize: 16,
    },
  });
  return (
    <ScrollView>
      <View style={styles.container}>
        {steps.map((step, index) => (
          <TouchableOpacity
            key={index}
            style={styles.stepContainer}
            onPress={() => onPress(index)}>
            <View
              style={[
                styles.step,
                activeSteps.includes(index) && styles.activeStep,
              ]}>
              <View>
                <Typography
                  color={activeSteps.includes(index) ? 'primary' : 'grey'}
                  gutterBottom={5}
                  fontWeight={600}>
                  {step?.label}
                </Typography>
                <Typography variant="caption" color="grey">
                  {step?.details}
                </Typography>
              </View>

              <View style={styles.stepCircle}>
                {activeSteps.includes(index) ? (
                  <Text style={styles.stepCircleText}>{index + 1}</Text>
                ) : (
                  <View style={styles.stepCircleInactive}>
                    <Text style={styles.stepCircleText}>{index + 1}</Text>
                  </View>
                )}
              </View>
              {/* <View style={styles.stepTextContainer}>
              <Text style={styles.stepLabel}>{step}</Text>
            </View> */}
            </View>
            {/* {
              steps.i
            } */}
            {index === steps?.length - 1 ? null : (
              <View style={{marginLeft: 12}}>
                <View
                  style={{
                    height: 40,
                    borderColor: activeSteps.includes(index)
                      ? colors.primary.main
                      : '#aaa',
                    borderStyle: 'solid',
                    borderLeftWidth: 1,
                  }}></View>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default VerticalStepper;
