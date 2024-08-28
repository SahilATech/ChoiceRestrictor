# ChoiceRestrictor

**ChoiceRestrictor** is a sophisticated custom control for the PowerApps Component Framework (PCF) designed to manage the availability of options in OptionSets and MultiSelectOptionSets within Dynamics 365 CRM. It provides a user-friendly solution for restricting certain options without altering existing records, thereby preserving data integrity while controlling user selection.

![ChoiceRestrictorControl_MultiSelect](https://github.com/SahilATech/ChoiceRestrictor/blob/0bf2727c4b101793205c7dca2e2e041c5052e72e/Images/ChoiceRestrictorControl_MultiSelect.png)

[Managed Solution](https://github.com/SahilATech/ChoiceRestrictor/raw/0bf2727c4b101793205c7dca2e2e041c5052e72e/Solutions/solutions_managed.zip)


## Features

- **Restricted Choices**: This allows you to restrict users from selecting certain options in real-time, without affecting the existing records in the database. This prevents users from selecting disabled options moving forward, while preserving **data consistency for records created before the restriction was applied**.
- **Non-Intrusive Data Management**: Ensures that the restriction of options does not impact existing records or require complex JavaScript logic to handle the removal of options. It simplifies the management of choice fields by applying restrictions without modifying historical data.
- **Easy Configuration**: Provides an intuitive configuration interface to specify restricted choices and manage user access to options.


## Key Properties

- **`Choice`**: Bound property that specifies the OptionSet or MultiSelectOptionSet to which the control is connected. This property is required for the control to function correctly.
- **`RestrictedChoices`**: A comma-separated list of choices that are restricted. This property allows you to specify which options should be disabled from the user selection.

![ChoiceRestrictorProperties](https://github.com/SahilATech/ChoiceRestrictor/blob/0bf2727c4b101793205c7dca2e2e041c5052e72e/Images/ChoiceRestrictorProperties.png)


## Usage

**ChoiceRestrictor** is ideal for scenarios where you need to restrict user selections within choice fields while maintaining the integrity of existing records. It provides a straightforward solution for managing available options without affecting previously created data or requiring complex logic. This control enhances user experience by clearly defining selectable options and ensuring that only valid choices are available for new records.

**ChoiceRestrictorControl SingleSelect**

![ChoiceRestrictorControl_SingleSelect Collapse](https://github.com/SahilATech/ChoiceRestrictor/blob/0bf2727c4b101793205c7dca2e2e041c5052e72e/Images/ChoiceRestrictorControl_SingleSelect.png)
 
 **ChoiceRestrictorControl MultiSelect**
 
![ChoiceRestrictorControl_MultiSelect](https://github.com/SahilATech/ChoiceRestrictor/blob/0bf2727c4b101793205c7dca2e2e041c5052e72e/Images/ChoiceRestrictorControl_MultiSelect.png)


[Managed Solution](https://github.com/SahilATech/ChoiceRestrictor/raw/0bf2727c4b101793205c7dca2e2e041c5052e72e/Solutions/solutions_managed.zip)

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/SahilATech/ChoiceRestrictor/blob/0bf2727c4b101793205c7dca2e2e041c5052e72e/LICENSE) file for details.

---

You can adjust the sections and content as needed to fit your project's specifics and documentation style.

