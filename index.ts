import { IComboBoxOption, IDropdownOption } from "@fluentui/react";
import { SelectableOptionMenuItemType } from '@fluentui/react';
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { HelloWorld, IHelloWorldProps } from "./HelloWorld";
import * as React from "react";

export class ChoiceRestrictor implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
    private notifyOutputChanged: () => void;

    /**
     * Empty constructor.
     */

    private _Choices : IComboBoxOption[] =[  ];

    private _defaultChoice? : number;
    private _selectedChoiceSingle : number | undefined;

    private _selectedChoiceMulti? : number[] | undefined;
    private _restrictedChoices:string[]| undefined;

    private _isMultiSelectOptionSet:boolean;
    private _isDisable:boolean;
    constructor() { }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     */
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;

        this._restrictedChoices = context.parameters.RestrictedChoices.raw?.split(",").map(choice => choice.trim());

        interface CustomChoiceAttributes {
            DefaultValue?: number;
            Options?: Array<{ 
                Value: number; 
                Label: string;
            }>;            
            Type?:string;
        }
        
        // Cast the attributes to the CustomChoiceAttributes type
        const attributes = context.parameters.choice.attributes as CustomChoiceAttributes;
        
        // Handle DefaultValue
        if (attributes?.DefaultValue) {
            this._defaultChoice = attributes.DefaultValue;
        }

        
        this._isMultiSelectOptionSet =  attributes?.Type === "multiselectpicklist";
        if(this._isMultiSelectOptionSet){
            this._Choices.push( { key: 'selectAll', text: 'Select All', itemType: SelectableOptionMenuItemType.SelectAll });
            this._selectedChoiceMulti = Array.isArray(context.parameters.choice.raw) ? context.parameters.choice.raw as number[] : [];
        }
        else{     
            if(!(context.parameters.choice.attributes?.RequiredLevel == 1 || context.parameters.choice.attributes?.RequiredLevel == 2))   
                this._Choices.push( { key: 'Null', text: '--Select--', itemType: SelectableOptionMenuItemType.SelectAll });    
            this._selectedChoiceSingle =attributes.Options?.find(it => {return it.Label === context.parameters.choice.formatted;})?.Value
        }
        
        // Disabled or Hiding Restricted Choices        
        const options = attributes?.Options;

        options?.forEach(option => {  
            const presentInRestrict = this._restrictedChoices?.includes(option.Value.toString());

            
            context.parameters.RestrictedChoicesVisibility.raw == "1" || //Disable the option
            (!this._isMultiSelectOptionSet && option.Value == this._selectedChoiceSingle) || //Disable the option if key already selected (previously)
            (this._isMultiSelectOptionSet && this._selectedChoiceMulti?.includes(option.Value)) ? //add the option in list if key already selected (previously) but not disable
                this._Choices.push({
                    key: option.Value,
                    text: option.Label,
                    //in case of multiselect can't disable becasue user unselect 
                    //in case of single select disable becasue select other option then automatic unselect then happen in multiselect
                    disabled: this._isMultiSelectOptionSet ? false : presentInRestrict
                })
                :
                !presentInRestrict ? //if key not selected (previously) and in restrict list then not add into list
                this._Choices.push({
                    key: option.Value,
                    text: option.Label
                })
                :
                null
        });


        this._isDisable = context.mode.isControlDisabled;
                      
    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns ReactElement root react element for the control
     */
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        const props: IHelloWorldProps = {
            Choices: this._Choices,
            defaultChoice: this._defaultChoice,
            selectedChoiceSingle : this._selectedChoiceSingle,
            selectedChoiceMulti: this._selectedChoiceMulti,
            onChange: this.onChoiceSelectChange,
            isMultiSelectOptionSet: this._isMultiSelectOptionSet,
            isDisable : this._isDisable,
            restrictedChoices:this._restrictedChoices!,
        };
        return React.createElement(
            HelloWorld, props
        );
    }

    private onChoiceSelectChange = (selectedChoice ? : number | undefined | (string | number)[]) => {
        
        if(this._isMultiSelectOptionSet){

            this._selectedChoiceMulti = selectedChoice as number[];

        }
        else this._selectedChoiceSingle = selectedChoice as number;
        this.notifyOutputChanged();
    };

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
     */
    public getOutputs(): IOutputs {

        if(this._isMultiSelectOptionSet){
            return {
                choice: this._selectedChoiceMulti ?? null
            };
        }
        else{
            return {
                choice:  typeof this._selectedChoiceSingle === 'number' ? this._selectedChoiceSingle : null
            };
        }

       
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}
