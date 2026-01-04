import React, {
    createContext,
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    type ReactNode,
} from "react"
import {
    StyleSheet,
    TouchableOpacity,
    View,
    type TouchableOpacityProps,
    type ViewProps,
} from "react-native"
import ConfettiCannon from "react-native-confetti-cannon"

type ConfettiOptions = {
  particleCount?: number
  angle?: number
  spread?: number
  startVelocity?: number
  decay?: number
  gravity?: number
  drift?: number
  ticks?: number
  origin?: { x?: number; y?: number }
  colors?: string[]
  shapes?: ("circle" | "square")[]
  scalar?: number
  zIndex?: number
  disableForReducedMotion?: boolean
}

type Api = {
  fire: (options?: ConfettiOptions) => void
}

type Props = ViewProps & {
  options?: ConfettiOptions
  manualstart?: boolean
  children?: ReactNode
}

export type ConfettiRef = Api | null

const ConfettiContext = createContext<Api>({} as Api)

const ConfettiComponent = forwardRef<ConfettiRef, Props>((props, ref) => {
  const {
    options = {},
    manualstart = false,
    children,
    style,
    ...rest
  } = props

  const confettiRef = useRef<any>(null)

  const fire = useCallback(
    (opts: ConfettiOptions = {}) => {
      const mergedOptions = { ...options, ...opts }
      
      // Start the confetti animation
      if (confettiRef.current) {
        confettiRef.current.start()
      }
    },
    [options]
  )

  const api = useMemo(
    () => ({
      fire,
    }),
    [fire]
  )

  useImperativeHandle(ref, () => api, [api])

  useEffect(() => {
    if (!manualstart) {
      fire()
    }
  }, [manualstart, fire])

  // Convert options to react-native-confetti-cannon format
  const confettiConfig = {
    count: options.particleCount || 150,
    origin: {
      x: options.origin?.x ? options.origin.x * 1000 : 0,
      y: options.origin?.y ? options.origin.y * 1000 : 0,
    },
    colors: options.colors || ["#26ccff", "#a25afd", "#ff5e7e", "#88ff5a", "#fcff42", "#ffa62d", "#ff36ff"],
    fadeOut: options.decay !== undefined,
    explosionSpeed: options.startVelocity || 350,
    fallSpeed: options.gravity ? options.gravity * 1000 : 3000,
  }

  return (
    <ConfettiContext.Provider value={api}>
      <View style={[styles.container, style]} {...rest}>
        <ConfettiCannon
          ref={confettiRef}
          {...confettiConfig}
          autoStart={false}
        />
        {children}
      </View>
    </ConfettiContext.Provider>
  )
})

ConfettiComponent.displayName = "Confetti"

export const Confetti = ConfettiComponent

interface ConfettiButtonProps extends TouchableOpacityProps {
  options?: ConfettiOptions
  children?: ReactNode
}

const ConfettiButtonComponent = ({
  options = {},
  children,
  onPress,
  style,
  ...props
}: ConfettiButtonProps) => {
  const confettiRef = useRef<any>(null)

  const handlePress = useCallback(
    (event: any) => {
      // Trigger confetti
      if (confettiRef.current) {
        confettiRef.current.start()
      }

      // Call original onPress if provided
      onPress?.(event)
    },
    [onPress]
  )

  const confettiConfig = {
    count: options.particleCount || 100,
    origin: { x: 0, y: 0 },
    colors: options.colors || ["#26ccff", "#a25afd", "#ff5e7e", "#88ff5a", "#fcff42", "#ffa62d", "#ff36ff"],
    explosionSpeed: options.startVelocity || 350,
    fallSpeed: options.gravity ? options.gravity * 1000 : 3000,
  }

  return (
    <View style={styles.buttonContainer}>
      <ConfettiCannon
        ref={confettiRef}
        {...confettiConfig}
        autoStart={false}
      />
      <TouchableOpacity
        onPress={handlePress}
        style={[styles.button, style]}
        {...props}
      >
        {children}
      </TouchableOpacity>
    </View>
  )
}

ConfettiButtonComponent.displayName = "ConfettiButton"

export const ConfettiButton = ConfettiButtonComponent

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  buttonContainer: {
    position: "relative",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
})