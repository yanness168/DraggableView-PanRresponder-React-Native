import React, {useRef} from 'react';
import { SafeAreaView, Animated, PanResponder, StyleSheet, View } from "react-native";



export default function App() {
  /* Create an animated position */
  const initial = useRef(new Animated.ValueXY()).current;
  const value = {x: 0, y:0}
  /* Create a gesture responder sys */
  const Pan = PanResponder.create({
    /* Claim to be the the responder (just the assigned component) */
      onStartShouldSetPanResponder: (e,gesture) => true,
      /* When the user touches, set x and y to (0,0)*/
      onPanResponderGrant:(e,gesture)=>{
        initial.setOffset({
          x: value.x,
          y: value.y
        })
      },
      /* When user dragging the shape, map dx and dy to x & y */
      onPanResponderMove: Animated.event([
        null, {dx: initial.x,dy: initial.y},
      ]),
      /* When user releases his finger, let the shape goes back to (0,0) */
      onPanResponderRelease: () => {
        Animated.timing(initial,{
            toValue: {x:0, y:0},
            duration: 350,
          }
        ).start(()=>{
          alert('You released me!')
        });
      }
    })
    
  
  return (
    <SafeAreaView style={styles.container}>
                                        {/* Converts {x, y} into {left, top} for use in style */}
      <Animated.View {...Pan.panHandlers} style={[initial.getLayout(), styles.child]}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  child: {
    backgroundColor: "pink",
    width: 200,
    height: 200,
    borderRadius: 4,
  },
});
