/*
*This is auto generated from the ControlManifest.Input.xml file
*/

// Define IInputs and IOutputs Type. They should match with ControlManifest.
export interface IInputs {
    choice: ComponentFramework.PropertyTypes.Property;
    RestrictedChoices: ComponentFramework.PropertyTypes.StringProperty;
    RestrictedChoicesVisibility: ComponentFramework.PropertyTypes.EnumProperty<"1" | "0">;
}
export interface IOutputs {
    choice?: any;
}
