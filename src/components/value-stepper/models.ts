export interface ValueStepperProps {
  step: number; // The increment/decrement value (e.g., 0.5 or 1)
  max: number; // The maximum value allowed in the input field
  initialValue?: number; // Optional: Starting value
}
