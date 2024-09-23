import { Image, ScrollView, View, Text, TouchableOpacity, StyleSheet, Switch, Modal, TextInput, Dimensions} from 'react-native'
import React, {useState} from 'react'
import Backarrow from '../Components/Svg/Backarrow'
import Editbutton from '../Components/Svg/Editbutton'
import { useNavigation } from '@react-navigation/native'
import UploadDoc from './UploadDoc.tsx';
import CheckBox from '@react-native-community/checkbox';
import { Dropdown } from 'react-native-element-dropdown';

const Profile = () => {

    // Interface for user's Staff Role Preferences
    interface StaffRoles {
        startDate: string;
        preferredLocation: string;
        relocate: boolean;
        desiredPay: string;
        preferredHours: string
    };

    // Interface for user's Local Contracts Preferences
    interface LocalContracts {
        startDate: string;
        preferredLocation: string;
        relocate: boolean;
        desiredPay: string;
        preferredHours: string
    }

    // Interface for user's Travel Contracts Preferences
    interface TravelContracts {
        startDate: string;
        preferredLocation: string;
        relocate: boolean;
        desiredPay: string;
        preferredHours: string
    }

    // Use State for user's Staff Role Preferences
    const [staffRolePrefs, setStaffRolePrefs] = useState<StaffRoles>(
        {startDate: "", preferredLocation: "", relocate: false, desiredPay: "", preferredHours:""}
    );

    // Use State for user's Local Contracts Preferences
    const [localContractsPrefs, setLocalContractsPrefs] = useState<LocalContracts>(
        {startDate: "", preferredLocation: "", relocate: false, desiredPay: "", preferredHours:""}
    );

    // Use State for user's Travel Contracts Preferences
    const [travelContractsPrefs, setTravelContractsPrefs] = useState<StaffRoles>(
        {startDate: "", preferredLocation: "", relocate: false, desiredPay: "", preferredHours:""}
    );

    const [isRelocateSelected, setRelocateSelection] = useState(false); // State for checkbox in Job Preferences
    const [isMorningSelected, setMorningSelection] = useState(false);   // State for Morning Checkbox in Job Preferences
    const [isAfternoonSelected, setAfternoonSelection] = useState(false);   // State for Afternoon Checkbox in Job Preferences
    const [isEveningSelected, setEveningSelection] = useState(false);   // State for Evening Checkbox in Job Preferences
    const [isFlexibleSelected, setFlexibleSelection] = useState(false); // State for Flexible Checkbox in Job Preferences

    // Temporary useSates to handle changes to the user's Staff Role Preferences. Updates staffRolePrefs after confirmation
    const [tmpStartDate, setTmpStartDate] = useState("");
    const [tmpPreferredLocation, setTmpPreferredLocation] = useState("");
    // checkbox isSelcted value functions as the value for the relocate attribute of the staffRolePrefs
    const [tmpDesiredPay, setTmpDesiredPay] = useState("");
    // value for preffered hours is determined by the time checkboxe(s) values

    // funtion to update StaffRollPrefs based on tmp variable use states
    const updateStaffRolePrefs = () => {
        setStaffRolePrefs({
            startDate: tmpStartDate,
            preferredLocation: tmpPreferredLocation,
            relocate: isRelocateSelected, 
            desiredPay: tmpDesiredPay,
            preferredHours: determinePrefHours(isMorningSelected, isAfternoonSelected, isEveningSelected, isFlexibleSelected)
        });
    };

    // funtion to update LocalContractPrefs based on tmp variable use states
    const updateLocalContractsPrefs = () => {
        setStaffRolePrefs({
            startDate: tmpStartDate,
            preferredLocation: tmpPreferredLocation,
            relocate: isRelocateSelected, 
            desiredPay: tmpDesiredPay,
            preferredHours: determinePrefHours(isMorningSelected, isAfternoonSelected, isEveningSelected, isFlexibleSelected)
        });
    };

    // funtion to update TravelContractsPrefs
    const updateTravelContractsPrefs = () => {
        setStaffRolePrefs({
            startDate: tmpStartDate,
            preferredLocation: tmpPreferredLocation,
            relocate: isRelocateSelected, 
            desiredPay: tmpDesiredPay,
            preferredHours: determinePrefHours(isMorningSelected, isAfternoonSelected, isEveningSelected, isFlexibleSelected)
        });
    };

    // function to determin preferred hours
    const determinePrefHours = (morning: boolean, afternoon: boolean, evening: boolean, flexible: boolean) => {
        if (morning)
            return "Morning"
        else if (afternoon)
            return "Afternoon"
        else if (evening)
            return "Evening"
        else if (flexible)
            return "Flexible"
        else
            return "ERROR: cannot determine preferred hours"
    };       
    

    const [staffRoles, setStaffRoles] = useState(false); // State for actively looking switch (Staff Roles)
    const [localContracts, setLocalContracts] = useState(false); // State for actively looking switch (Local Contracts)
    const [travelContracts, setTravelContracts] = useState(false); // State for actively looking switch (Travel Contracts)
    const [showStaffDetails, setShowStaffDetails] = useState(false); // State for staff roles details
    const [showTravelDetails, setShowTravelDetails] = useState(false); // State for travel contracts details
    const [showLocalDetails, setShowLocalDetails] = useState(false); // State for local contracts details
    const navigation = useNavigation<any>(); // Stack Navigation

    // Modals
    const [modalVisible, setModalVisible] = useState(false); // State for edit Modal

    const screenHeight = Dimensions.get('window').height; // get the height of the screen for modal translation

    const firstName = "First";
    const lastName = "Last";
    const specialty = "Specialty";
    const firstInitial = firstName.charAt(0).toUpperCase(); // Get first letter of first name
    const lastInitial = lastName.charAt(0).toUpperCase(); // Get last letter of first name

    const profileStrength = 33;
    const phoneNumber = "(123) 456-7890"; 
    const email = "example@example.com"; 

    // hourly pay for dropdown menu in Job Preference edits
    const hourlyPay = [
        {label: '$20.00 - $25.00', value: '$20.00 - $25.00'},
        {label: '$25.00 - $30.00', value: '$25.00 - $30.00'},
        {label: '$30.00 - $35.00', value: '$30.00 - $35.00'},
        {label: '$35.00 - $40.00', value: '$35.00 - $40.00'},
        {label: '$40.00 - $45.00', value: '$40.00 - $45.00'},
        {label: '$45.00 - $50.00', value: '$45.00 - $50.00'},
        {label: '$50.00+', value: '$50.00+'},
        {label: '---', value: '---'}
      ];

    // Function to toggle visibility of staff roles details
    const toggleStaffDetails = () => {
        setShowStaffDetails(!showStaffDetails);
        console.log("staff roles see more details clicked");
    };

    // Function to toggle visibility of travel contracts details
    const toggleTravelDetails = () => {
        setShowTravelDetails(!showTravelDetails);
        console.log("travel contracts see more details clicked");
    };

    // Function to toggle visibility of local contracts details
    const toggleLocalDetails = () => {
        setShowLocalDetails(!showLocalDetails);
        console.log("local contracts see more details clicked");
    };


    const handleEdit = () => {
        navigation.navigate('EditProfile')
        console.log("edit clicked")

    }

    const handleDoc = () => {
        console.log("doc pressed")
    }

    const handleStaffSwitch = () => {
        console.log("Staff roles switch clicked")
    }

    const handleTravelSwitch = () => {
        console.log("Travel contracts switch clicked")
    }


    const handleLocalSwitch = () => {
        console.log("Local contracts switch clicked")
    }

    const handleStringProp = (stringProp: string) => {
        switch(stringProp){
            case "Resume":
                navigation.navigate('UploadDoc', { header: 'Resume' });
                break;
            case 'Degree':
                navigation.navigate('UploadDoc', { header: 'Degree' });
                break;
            case 'Certifications':
                navigation.navigate('UploadDoc', { header: 'Certifications' });
                break;
            case 'References':
                navigation.navigate('UploadDoc', { header: 'References' });
                break;
            case 'Vaccination':
                navigation.navigate('UploadDoc', { header: 'Vaccination' });
                break;
            default:
                navigation.navigate(UploadDoc,{header: "Error"});
                break;
        }
        console.log(stringProp);
    };
    // When License btn is clicked
    const handleLicense = () =>{
        navigation.navigate('UpdateLicense');
        console.log('Lisence')
    };
    // Handle a press of the edit buttons within the Job Preferences
    const handleJobEditPress = () => {
        setModalVisible(true);
    };

  return (
    <View style={styles.container}>

        {/* Modal for editing Job Preferences */}
        <Modal
            animationType='slide'
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
        >
            <View style={{flex: 1}}>
                <Text style={styles.modalTitle}>Modal Title</Text>

                {/* Start Date selection */}
                <Text style={styles.modalQuestion}>When would you like to start?</Text>
                <TextInput 
                    placeholder="Choose a start date" 
                    onChangeText={newText => setTmpStartDate(newText)} 
                    style={styles.textBoxStyle}>
                </TextInput>

                {/* Preferred Location Selection */}
                <Text style={styles.modalQuestion}>Choose prefered locations</Text>
                <TextInput 
                    placeholder="Type any cities, states, or regions" 
                    onChangeText={newText => setTmpPreferredLocation(newText)}
                    style={styles.textBoxStyle}>
                </TextInput>

                <View style={{flexDirection:'row', alignItems: 'center'}}>
                    <CheckBox
                        value={isRelocateSelected}
                        onValueChange={setRelocateSelection}
                    />
                    <Text style={{color: 'black'}}>Open to relocation</Text>
                </View>

                <View >
                    <Text style={styles.modalQuestion}>Desired Pay (Hourly)</Text>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={hourlyPay}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="$"
                        searchPlaceholder="Search..."
                        value={tmpDesiredPay}
                        onChange={item => {
                          setTmpDesiredPay(item.value);
                        }}
                    />
                </View>
                <View>
                    <Text style={styles.modalQuestion}>Preferred Hours (select one)</Text>
                    <View style={{flexDirection: 'row', justifyContent:'space-around'}}>
                        <CheckBox 
                            value={isMorningSelected}
                            onValueChange={setMorningSelection}
                        />
                        <Text style={{alignSelf:'center', color:'black'}}>Morning</Text>
                        <CheckBox 
                            value={isAfternoonSelected}
                            onValueChange={setAfternoonSelection}
                        />
                        <Text style={{alignSelf:'center', color: 'black'}}>Afternoon</Text>
                        <CheckBox 
                            value={isEveningSelected}
                            onValueChange={setEveningSelection}
                        />
                        <Text style={{alignSelf:'center', color: 'black'}}>Evening</Text>
                        <CheckBox 
                            value={isFlexibleSelected}
                            onValueChange={setFlexibleSelection}
                        />
                        <Text style={{alignSelf:'center', color:'black'}}>Flexible</Text>
                    </View>
                </View>

                {/* Confirm Choices Button */}
                <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
                    <TouchableOpacity style={styles.exitModalButton} onPress={() => {
                        updateStaffRolePrefs();
                        setModalVisible(!modalVisible);}}>
                        <Text style={styles.exitModalButtonText}>Confirm Choices</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>

        <View style={styles.topThird}>
        {/* Back Arrow */}
            <View style={styles.svgContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View style={styles.backArrowTopLeft}>
                        <Backarrow width={40} height={40} color={"#000"}/>
                    </View>
                </TouchableOpacity>
                {/* Edit Button */}
                <TouchableOpacity onPress={handleEdit}>
                    <View style={styles.editButtonTopRight}>
                        <Editbutton width={40} height={40} color={"#000"}/>
                    </View>
                </TouchableOpacity>
            </View>
            {/* Profile Picture section */}
            <View style={styles.profilePictureContainer}>
                {/* While user does not have a profile picture uploaded, their initials are their profile picture */}
                <Text style={styles.profilePictureFirstInitial}>{firstInitial}</Text>
                <Text style={styles.profilePictureFirstInitial}>{lastInitial}</Text>
            </View>

            {/* Name section */}
            <View style={styles.nameContainer}>
                <Text style={styles.firstName}>{firstName}</Text>
                <Text style={styles.lastName}>{lastName}</Text>
            </View>

            {/* Specialty section */}
            <Text style={styles.specialty}>{specialty}</Text>    
        </View>
        

        <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.bottomTwoThirds}>
            {/* Profile strength section */}
            <View style={styles.profileStrengthSection}>
                <View style={styles.profileStrengthTextContainer}>
                    <Text style={styles.profileStrengthText}>Profile Strength</Text>
                    <Text style={styles.profileStrengthPercentage}>{profileStrength}%</Text>
                </View>

                {/* Profile strength bar */}
                <View style={styles.profileStrengthBarContainer}>
                    <View style={styles.profileStrengthBarOutline}>
                        <View style={[styles.profileStrengthBar, { width: `${profileStrength}%` }]} />
                    </View>
                </View>

                {/* Phone section */}
                <View style={styles.phoneContainer}>
                    <Text style={styles.phoneLabel}>Phone</Text>
                    <Text style={styles.phoneNumber}>{phoneNumber}</Text>
                </View>

                
                {/* Email section */}
                <View style={styles.emailContainer}>
                    <Text style={styles.phoneLabel}>Email</Text>
                    <Text style={styles.phoneNumber}>{email}</Text>
                </View>
                
            </View>

                {/* Line */}
                <View style={styles.line}/>

                {/* Additional sections */}
                <View style={styles.additionalSectionsContainer}>
                    {/* Resume */}     
                    <TouchableOpacity style={styles.additionalSectionRow} onPress={() => handleStringProp('Resume')}>
                        <Text style={styles.additionalSection}>Resume</Text>
                        <View style={styles.rightArrowAlign}>
                            <Text style={styles.rightArrow}>{'>'}</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Licenses */}
                    <TouchableOpacity style={styles.additionalSectionRow} onPress={handleLicense}>
                        <Text style={styles.additionalSection}>Licenses</Text>
                        <View style={styles.rightArrowAlign}>
                            <Text style={styles.rightArrow}>{'>'}</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Degree */}
                    <TouchableOpacity style={styles.additionalSectionRow} onPress={() => handleStringProp('Degree')}>
                        <Text style={styles.additionalSection}>Degree</Text>
                        <View style={styles.rightArrowAlign}>
                            <Text style={styles.rightArrow}>{'>'}</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Certifications */}
                    <TouchableOpacity style={styles.additionalSectionRow } onPress={() => handleStringProp('Certifications')}>
                        <Text style={styles.additionalSection}>Certifications</Text>
                        <View style={styles.rightArrowAlign}>
                            <Text style={styles.rightArrow}>{'>'}</Text>
                        </View>
                    </TouchableOpacity>

                    {/* References */}
                    <TouchableOpacity style={styles.additionalSectionRow} onPress={() => handleStringProp('References')}>
                        <Text style={styles.additionalSection}>References</Text>
                        <View style={styles.rightArrowAlign}>
                            <Text style={styles.rightArrow}>{'>'}</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Vaccination */}
                    <TouchableOpacity style={styles.additionalSectionRow} onPress={() => handleStringProp('Vaccination')}>
                        <Text style={styles.additionalSection}>Vaccination</Text>
                        <View style={styles.rightArrowAlign}>
                            <Text style={styles.rightArrow}>{'>'}</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Line */}
                <View style={styles.line}/>

                {/* Job Preferences section */}
                <View style={styles.jobPreferencesContainer}>
                    <Text style={styles.jobPreferencesText}>Job Preferences</Text>

                     {/* Staff Roles Actively Looking Switch */}
                     <View style={styles.switchContainer}>
                        <Text style={styles.activelyLookingText}>Actively Looking</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={staffRoles ? "#f4f3f4" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => {
                                setStaffRoles(!staffRoles)
                                handleStaffSwitch();
                            }}
                            value={staffRoles}
                        />
                     </View>
                     <View style={{flexDirection: 'row'}}>     
                        <Text style={styles.jobTypeText}>Staff Roles</Text>

                        {/* Edit button*/}
                        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                            <Editbutton width={25} height={25} color={"#000"} style={{marginRight: '10%', marginTop: 10}}/>
                        </TouchableOpacity>
                    </View> 
                     <View style={styles.seeMoreDetailsContainer}>
                        <TouchableOpacity onPress={toggleStaffDetails}>
                                <Text style={styles.seeMoreDetailsText}> {'>'} See more details</Text>
                        </TouchableOpacity>
                        

                        {/* Staff Roles See More Details Information*/}
                        {showStaffDetails && (
                        <View style={styles.seeMoreDetailsInformationContainer}>
                            <Text style={styles.seeMoreDetailsInformation}>Preferred Start Date: {staffRolePrefs.startDate}</Text>
                            <Text style={styles.seeMoreDetailsInformation}>Preferred Location: {staffRolePrefs.preferredLocation}</Text>
                            <Text style={styles.seeMoreDetailsInformation}>Open to Relocation: {staffRolePrefs.relocate ? "yes" : "no"}</Text>
                            <Text style={styles.seeMoreDetailsInformation}>Desired Pay: {staffRolePrefs.desiredPay}</Text>
                            <Text style={styles.seeMoreDetailsInformation}>Preferred Hours: {staffRolePrefs.preferredHours}</Text>
                        </View>
                        )}
                     </View>

                     
                     {/* Travel Contracts Actively Looking Switch */}
                     <View style={styles.switchContainer}>
                        <Text style={styles.activelyLookingText}>Actively Looking</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={travelContracts ? "#f4f3f4" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => {
                                setTravelContracts(!travelContracts)
                                handleTravelSwitch();
                            }}
                            value={travelContracts}
                        />
                     </View>

                     <View style={{flexDirection: 'row'}}>     
                        <Text style={styles.jobTypeText}>Travel Contracts</Text>

                        {/* Edit Button */}
                        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                            <Editbutton width={25} height={25} color={"#000"} style={{marginRight: '10%', marginTop: 10}}/>
                        </TouchableOpacity>
                     </View> 
                     <View style={styles.seeMoreDetailsContainer}>
                        <TouchableOpacity onPress={toggleTravelDetails}>
                                <Text style={styles.seeMoreDetailsText}> {'>'} See more details</Text>
                        </TouchableOpacity>
                        

                        {/* Travel Contracts See More Details Information*/}
                        {showTravelDetails && (
                        <View style={styles.seeMoreDetailsInformationContainer}>
                            <Text style={styles.seeMoreDetailsInformation}>Information</Text>
                            <Text style={styles.seeMoreDetailsInformation}>Information</Text>
                            <Text style={styles.seeMoreDetailsInformation}>Information</Text>
                            <Text style={styles.seeMoreDetailsInformation}>Information</Text>
                        </View>
                        )}
                     </View>
                        

                    
                     {/* Local Contracts Actively Looking Switch */}
                     <View style={styles.switchContainer}>
                        <Text style={styles.activelyLookingText}>Actively Looking</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={localContracts ? "#f4f3f4" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => {
                                setLocalContracts(!localContracts)
                                handleLocalSwitch();
                            }}
                            value={localContracts}
                        />
                     </View>

                     <View style={{flexDirection: 'row'}}>     
                        <Text style={styles.jobTypeText}>Local Contracts</Text>

                        {/* Edit Button */}
                        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} >
                            <Editbutton width={25} height={25} color={"#000"} style={{marginRight: '10%', marginTop: 10}}/>
                        </TouchableOpacity>
                     </View> 
                     <View style={styles.seeMoreDetailsContainer}>
                        <TouchableOpacity onPress={toggleLocalDetails}>
                                <Text style={styles.seeMoreDetailsText}> {'>'} See more details</Text>
                        </TouchableOpacity>
                        

                        {/* Local Contracts See More Details Information*/}
                        {showLocalDetails && (
                        <View style={styles.seeMoreDetailsInformationContainer}>
                            <Text style={styles.seeMoreDetailsInformation}>Information</Text>
                            <Text style={styles.seeMoreDetailsInformation}>Information</Text>
                            <Text style={styles.seeMoreDetailsInformation}>Information</Text>
                            <Text style={styles.seeMoreDetailsInformation}>Information</Text>
                        </View>
                        )}
                     </View>
                </View>
        </View>
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,   
        width: '100%',     
    },
    topThird: {
        height: '22%',
        width: '100%',
        backgroundColor: '#0EA68D',
        justifyContent: 'center',
        alignItems: 'center',
    },
    svgContainer: {
        justifyContent: 'space-between',
        flexDirection:'row',
        width: '100%',
    },
    backArrowTopLeft: {
        justifyContent: 'flex-start',
    },
    editButtonTopRight: {
        justifyContent: 'flex-end',
    },
    scrollViewContent: {
        paddingBottom: 5, 
    },
    profilePictureContainer: {
        width: 70,
        height: 70,
        backgroundColor: 'lightgrey', 
        borderRadius: 35, 
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row',
    },
    profilePictureFirstInitial: {
        fontSize: 30,
        color: 'black', 
        marginRight: 1,
        marginLeft: 1,
    },
    profilePictureLastInitial: {
        fontSize: 20,
        color: 'white', 
    },
    nameContainer: {
        flexDirection:'row',
        alignItems: 'center',
        marginTop: 8,
    },
    firstName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        marginRight: 5,
    },
    lastName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    specialty: {
        fontSize: 12,
        color: 'black',
        opacity: 0.5,
    },
    profileStrengthSection: {
        marginLeft: 15,
        marginRight: 15,
    },
    profileStrengthTextContainer: {
        flexDirection:'row',
        alignItems: 'center',
        marginTop: 10,
    },
    profileStrengthText: {
        fontSize: 14,
        color: 'black',
        fontWeight: 'bold',
        marginRight: 5,
    },
    profileStrengthPercentage: {
        fontSize: 14,
        color: 'black',
        fontWeight: 'bold',
    },
    profileStrengthBarContainer: {
        height: 15,
        backgroundColor: 'white',
        marginTop: 5,
    },
    profileStrengthBarOutline: {
        borderColor: 'gray',
        borderWidth: 1, 
        borderRadius: 10,
        overflow: 'hidden'
    },
    profileStrengthBar: {
        height: '100%',
        backgroundColor: '#0EA68D', 
        borderRadius: 10,
    },
    phoneContainer: {
        marginTop: 30,
    },
    phoneLabel: {
        fontSize: 13,
        color: 'black',
    },
    phoneNumber: {
        fontSize: 14,
        color: 'black',
        fontWeight: 'bold',
    },
    emailContainer: {
        marginTop: 20,
    },
    emailLabel: {
        fontSize: 13,
        color: 'black',
    },
    email: {
        fontSize: 14,
        color: 'black',
        fontWeight: 'bold',
    },
    line: {
        height: 1,
        backgroundColor: 'gray',
        marginTop: 30,
        opacity: 0.5,
    },
    additionalSectionsContainer: {
        marginTop: 10,
        marginLeft: 15,
    },
    additionalSection: {
        flex: 1,
        fontSize: 19,
        marginTop: 20,
        color: 'black',
        fontWeight: 'bold',
    },
    additionalSectionRow: {
        flexDirection: 'row',
    },
    rightArrow: {
        fontSize: 20,
        color: 'black',
        marginRight: 35,
        marginTop: 20,
    },
    rightArrowAlign: {
        justifyContent: 'center',
    },
    jobPreferencesContainer: {
        marginTop: 30,
        marginLeft: 15,
    },
    jobPreferencesText: {
        fontSize: 19,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 10,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#C2EEE7',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        marginRight: 25,
        marginLeft: 10,
        marginTop: 10,
    },
    activelyLookingText: {
        flex: 1,
        fontSize: 15,
        color: 'black',
        fontWeight: 'bold',
    },
    jobTypeText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 10,
        marginLeft: 30,
        flex: 1
    },
    seeMoreDetailsContainer: {
        marginBottom: 30,
    },
    seeMoreDetailsText: {
        fontSize: 14,
        color: 'black',
        marginTop: 15,
        marginLeft: 30,
    },
    seeMoreDetailsInformation: {
        fontSize: 14,
        color: 'black',
        marginLeft: 10,
        marginBottom: 10,
    },
    seeMoreDetailsInformationContainer: {
        marginTop: 5,
        marginLeft: 30,
        borderWidth: 1,
        borderColor: 'rgba(128, 128, 128, 0.5)', // 0.5 opacity
        borderRadius: 7,
        marginRight: 25,
    },
    bottomTwoThirds: {
        flex: 4,
        backgroundColor: 'white',
    },

    modalStyle: {
        width: '50%',
        height: '60%', 
        backgroundColor:'black'
    },

    exitModalButton: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '8%',
        width: '80%',
        backgroundColor: '#0EA68D',
        borderRadius: 6,
        marginBottom: '30%'
    },

    exitModalButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 25,
    }, 

    modalTitle: {
        fontWeight: 'bold',
        fontSize: 18, 
        color: 'black',
        marginLeft: '2%',
        marginTop: '2%',
        marginBottom: '3%'
    }, 

    textBoxStyle: {
        borderColor: 'black',
        borderWidth: 1, 
        borderRadius: 10,
        marginLeft: '2%',
        marginRight: '2%',
        marginTop: '3%',
        marginBottom: '3%',
        height: 40
      },

      modalQuestion: {
        color: 'black', 
        marginLeft: '2%',
      }, 

      dropdown: {
        borderColor: 'black',
        borderWidth: 1, 
        borderRadius: 10,
        marginLeft: '2%',
        marginRight: '2%',
        marginTop: '3%',
        marginBottom: '3%',
        height: 40
      },

      placeholderStyle: {
        fontSize: 16,
        paddingLeft: 5
      },
    
      selectedTextStyle: {
        color: 'black',
        fontSize: 16,
        paddingLeft: 5
      },
    
      iconStyle: {
        width: 20,
        height: 20,
      },
    
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      }


    })

export default Profile