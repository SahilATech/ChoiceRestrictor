import * as React from 'react';
import { Dropdown, IDropdownOption} from '@fluentui/react/lib/Dropdown';
import { Icon } from '@fluentui/react/lib/Icon';
import { ComboBox, mergeStyleSets, SelectableOptionMenuItemType } from '@fluentui/react';

export interface IHelloWorldProps {
  Choices: IDropdownOption[];
  defaultChoice:number | undefined;
  isDisable:boolean;
  selectedChoiceSingle:number | undefined;  
  selectedChoiceMulti:number[] | undefined;
  restrictedChoices:string[],
  isMultiSelectOptionSet:boolean;
  onChange: (selectedChoice : number | (string | number)[] | undefined) => void;
}

interface IHelloWorldState {
  Choices: IDropdownOption[];
  defaultChoice:number;
  isDisable:boolean;
  selectedChoiceSingle:number | undefined;  
  selectedChoiceMulti:(string | number)[] | undefined;
  isMultiSelectOptionSet:boolean;
  selectableOptions:IDropdownOption<any>[] | undefined;
}

const onRenderCaretDown = (): JSX.Element => {
  return <Icon iconName="CirclePlus" />;
};


export class HelloWorld extends React.Component<IHelloWorldProps,IHelloWorldState> {
  constructor(props: IHelloWorldProps) {
    super(props);    
    this.state = {
      isMultiSelectOptionSet:props.isMultiSelectOptionSet,
      Choices:props.Choices,
      defaultChoice:props.defaultChoice!,
      isDisable:props.isDisable,
      selectedChoiceSingle:props.selectedChoiceSingle,
      selectableOptions : props.Choices?.filter( option => !option?.disabled && option?.key !== "selectAll"),

      //selectedChoiceMulti: props.selectedChoiceMulti,
      selectedChoiceMulti : 
      (props.selectedChoiceMulti?.filter(key => key.toString() !== 'selectAll').length as number)
      >=  (props.Choices?.filter( option => !option?.disabled && option?.key !== "selectAll")?.length as number) ? ['selectAll', ...( props.selectedChoiceMulti?.map(o => o) || [])] : props.selectedChoiceMulti
    }
    this.updateValues = this.updateValues.bind(this);
  }
  private updateValues(event: React.FormEvent<HTMLDivElement>,option?: IDropdownOption){   
    const selected = option?.selected;
    const currentSelectedOptionKeys = this.state.selectedChoiceMulti?.filter(key => key.toString() !== 'selectAll' && !this.props.restrictedChoices?.includes(key.toString()));
    const selectAllState = currentSelectedOptionKeys?.length === this.state.selectableOptions?.length;

      if(this.state.isMultiSelectOptionSet){

        if (option?.key === "selectAll") {
          selectAllState
            ?  this.setState((prevState) => {
              this.props.onChange([]);  
              return { selectedChoiceMulti: [] };
            })
            :
            this.setState((prevState) => {
              this.props.onChange([ ...(prevState.selectableOptions?.map(o => o.key as number) || [])])
              return { selectedChoiceMulti: ['selectAll', ...(prevState.selectableOptions?.map(o => o.key as number) || [])] }
          }); 
        } 
        else{
          if(selected){
            this.setState((prevState) => {
              const updatedChoices = [...(prevState.selectedChoiceMulti || []), option?.key as number];
              this.props.onChange(updatedChoices);  // Pass the updated state to onChange

              if(
                updatedChoices?.filter(
                  key => key.toString() !== 'selectAll' && 
                  !this.props.restrictedChoices?.includes(key.toString())
                ).length 
                >=  (this.state.selectableOptions?.length as number))
                  return { selectedChoiceMulti: ['selectAll', ...(updatedChoices.map(o => o) || [])]  };
              else
                return { selectedChoiceMulti : updatedChoices };
            });
          }
          else{
            const index = this.state.selectedChoiceMulti?.indexOf(option?.key as number);
            if (index !== undefined && index !== -1) {
                this.setState((prevState) => {
                    // Create a copy of the current array
                    const updatedChoices = [...(prevState.selectedChoiceMulti || [])];
                    // Remove the item at the found index
                    updatedChoices.splice(index, 1);

                    const indexAll = this.state.selectedChoiceMulti?.indexOf("selectAll");
                    if (indexAll !== undefined && indexAll !== -1)
                        updatedChoices.splice(indexAll, 1);

                    this.props.onChange(updatedChoices);
                    return { selectedChoiceMulti: updatedChoices };
                });
            }
          }
        }            
      } 
      else{ 
          this.setState({ selectedChoiceSingle: option?.key as number }, () => {
            this.props.onChange(option?.key as number);
        });     
      }    
  }
  

  public render(): React.ReactNode {
    const {isMultiSelectOptionSet,Choices,selectedChoiceSingle,selectedChoiceMulti,isDisable} = this.state;
    return (
      <div className={styles.container}>
          <Dropdown
          className={styles.Dropdown}
            placeholder="Select an option"      
            multiSelect={isMultiSelectOptionSet}
            options={Choices}

            onRenderCaretDown={onRenderCaretDown}
            
            defaultSelectedKey={selectedChoiceSingle}

            // Dynamically handle selectedKey vs. selectedKeys
            selectedKey={isMultiSelectOptionSet ? undefined : selectedChoiceSingle}
            selectedKeys={isMultiSelectOptionSet ? selectedChoiceMulti as string[]  : undefined}
            disabled={isDisable}
            onChange={this.updateValues}
          />
          </div>
    )
  }
}

const styles = mergeStyleSets({
  container: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '10px', // Adjust space between DatePicker and button
    minWidth: '-webkit-fill-available',
  },
  Dropdown: {
    flexGrow: 1, // Allows DatePicker to take available space
  }
});