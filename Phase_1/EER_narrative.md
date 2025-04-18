# EER Narrative of Burdell's Devoted Dogs Database (B3DB)

**PERSON** stores _FirstName_, _LastName_, _Phone_ and unique _Email_. 

Every **VOLUNTEER**, **DIRECTOR** and **ADOPTER** _**IS-A**_ **PERSON**.

**VOLUNTEER** stores _BirthDate_.

**USER** stores _Password_.

**ADOPTER** stores _Address_(_Street_, _City_, _State_, _Zip_) and _Household_.

Every **VOLUNTEER** and **DIRECTOR** _**IS-A**_ **USER**. 

Every **DOG** _**IS-REGISTERED-BY**_ one **USER**. `TODO: change relationship.`

**DOG** stores _Name_, _Description_, _Sex_, _Altered_, _BirthDate_, _SurrenderDate_,  _SurrenderPhone_, _ByAnimalControl_ and unique _DogID_.

**DOG** _**HAS**_ one or more **BREED**.

**BREED** stores unique _Name_.

**DOG** _**HAS**_ zero or one **MICROCHIP**.

**MICROCHIP** stores unique _MicrochipID_.

**MICROCHIP** _**HAS**_ **MANUFACTUER**, no **MICROCHIP** exists without **MANUFACTURER**. `TODO: change the relationship to MAKES.`

**MANUFACTUER** stores unique _Name_.

**DOG** _**HAS**_ zero or more **EXPENSE**, no **EXPENSE** exists without **DOG**.

**EXPENSE** stores unique (_DogID_, _Vendor_, _Date_), and _Amount_.

**EXPENSE** _**HAS**_ **CATEGORY**.

**CATEGORY** stores unique _Name_.

**ADOPTER** _**HAS**_ one or more **APPLICATION** per _Date_. No **ADOPTER** exists without **APPLICATION** and no **APPLICATION** exists without **ADOPTER**.

**APPLICATION** stores _Date_, _Status_, _Fee_, _IsFeeWaived_ and _DecisionDate_. **APPLICATION** _**HAS**_ zero or one **DOG**.

