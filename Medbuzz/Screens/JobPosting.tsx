import { Button, Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Backarrow from "../Components/Svg/Backarrow";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import CalendarTime from "../Components/Svg/CalendarTime";
import CalendarSuccess from "../Components/Svg/CalendarSuccess";
import Time from "../Components/Svg/Time";
import BuildingUser from "../Components/Svg/BuildingUser";

const { width, height } = Dimensions.get('window');
const JobPosting = () => {
    const testDate = new Date().toLocaleDateString('en-US');

    let jobTitle: string;
    let jobType: string;
    let jobLocation: string;
    let jobPostDate: Date;
    let jobStartDate: Date;
    let jobEndDate: Date;
    let jobDuration: string;
    let jobExperience: string;
    let jobPay: string;
    let jobDescription: string;
    const navigation = useNavigation<NavigationProp<any>>();

    const handleBack = () => {
        navigation.goBack()
    }
    
    const onApplyPress = (event: PressEvent) => {

    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                {/* Back Arrow */}
                <TouchableOpacity onPress={handleBack}>
                    <Backarrow width={width * .1} height={height * .05} stroke={'black'} strokeWidth={1} color={'black'} />
                </TouchableOpacity>
                {/* Job Title */}
                <Text style={styles.headerTitle}>{jobTitle || 'Job Title'}</Text>
                <View width={width * .1} height={height * .05} />
            </View>
            <ScrollView style={styles.scrollContainer}>
                {/* Upper Row */}
                <View style={styles.upperRow}>
                    {/* Job Type */}
                    <View style={styles.upperRowItem}>
                        <Text style={styles.upperRowItemTitle}>Job Type</Text>
                        <Text style={styles.upperRowItemBody}>{jobType || 'Unknown Type'}</Text>
                    </View>
                    {/* Job Date Posted */}
                    <View style={styles.upperRowItem}>
                        <Text style={styles.upperRowItemTitle}>Date Posted</Text>
                        <Text style={styles.upperRowItemBody}>{jobPostDate || testDate}</Text>
                    </View>
                </View>
                <Text style={styles.upperRowItemTitle}>{jobLocation || 'California'}</Text>
                {/* Space Gap */}
                <View style={{ width: '100%', height: height * 0.1 }}></View>

                {/* Overview Title */}
                <View style={styles.overviewHeader}>
                    <Text style={styles.overviewHeaderText}>Overview</Text>
                </View>
                {/* Overview */}
                <View style={styles.overviewContainer}>
                    <View style={styles.overviewDates}>
                        {/* Start Date */}
                        <View style={styles.overviewDatesBlock}>
                            <CalendarTime />
                            <View style={styles.overviewDatesText}>
                                <Text style={styles.iconTextUpper}>Start Date</Text>
                                <Text style={styles.iconTextLower}>{jobStartDate || testDate}</Text>
                            </View>
                        </View>
                        {/* End Date */}
                        <View style={styles.overviewDatesBlock}>
                            <CalendarSuccess />
                            <View style={styles.overviewDatesText}>
                                <Text style={styles.iconTextUpper}>End Date</Text>
                                <Text style={styles.iconTextLower}>{jobEndDate || testDate}</Text>
                            </View>
                        </View>
                    </View>
                    {/* Duration */}
                    <View style={styles.overviewDuration}>
                        <Time></Time>
                        <View>
                            <Text style={styles.iconTextUpper}>Duration</Text>
                            <Text style={styles.iconTextLower}>{jobDuration || 'Job Duration Value'}</Text>

                        </View>
                    </View>
                    {/* Experience */}
                    <View style={styles.overviewExperience}>
                        <BuildingUser />
                        <View>
                            <Text style={styles.iconTextUpper}>Experience</Text>
                            <Text style={styles.iconTextLower}>{jobExperience || 'Job Experience Value'}</Text>

                        </View>
                    </View>

                    {/* <View style= {{width: 100, height: 100, backgroundColor: 'black'}}></View> */}
                </View>

                {/* Space Gap */}
                <View style={{ width: '100%', height: height * 0.1 }}></View>

                <View>
                    <Text style={styles.overviewHeaderText}>Pay</Text>
                </View>
                <View style={styles.payContainer}>
                    {/* Pay Body Container */}
                        <View style = {styles.payLeftItem}>
                            <Text style = {styles.payUpperText}>Estimated Pay</Text>
                            <Text style = {styles.payLowerText}>{jobPay || 'Hourly Rate'}</Text>
                        </View>
                        <View style = {styles.payRightItem}>
                            <Text style = {styles.payRangeText}>{jobPay || '$25-35'}</Text>
                        </View>
                </View>

                {/* Space Gap */}
                <View style={{ width: '100%', height: height * 0.05 }}></View>

                {/* Description Container */}
                
                <View>
                    <Text style = {styles.overviewHeaderText}>Description</Text>
                    <View style = {styles.descriptionBody}>
                    <Text style = {{color: 'black'}}>{jobDescription || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}</Text>
                    </View>
                </View>

                {/* Space Gap */}
                <View style={{ width: '100%', height: height * 0.075 }}></View>

                {/* Apply Button */}
                <View style = {styles.buttonContainer}>
                    <Button style = {styles.button} color={'#0EA68D'} title='Apply'></Button>
                </View>

                {/* Space Gap */}
                <View style={{ width: '100%', height: height * 0.5 }}></View>
            </ScrollView>
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    header: {
        paddingTop: '2%',
        width: width,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: height * 0.075,
        backgroundColor: '#FFF',
        elevation: 5, // This will add a box shadow for Android
        shadowColor: "#000",  // this will add a box shadow for IOS
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    headerTitle: {
        display: 'flex',
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',

    },
    container: {
        backgroundColor: 'white',
        width: width,
        height: height,
        flex: 1,
        flexGrow: 1,
    },
    scrollContainer: {
        display: 'flex',
        flex: 1,
        flexGrow: 1,
        paddingHorizontal: '3%',
    },
    upperRow: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-start',
        paddingTop: '2%',
        alignItems: 'flex-start',
    },
    upperRowItem: {
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',

    },
    upperRowItemTitle: {
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
    },
    upperRowItemBody: {
        fontSize: 16,
        color: 'black',
    },
    middleRow: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',

    },
    overviewHeader: {
    },
    overviewHeaderText: {
        fontSize: 24,
        color: 'black',
        fontWeight: 'bold',
    },
    overviewContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: height * 0.25,
    },
    overviewDates: {
        display: 'flex',
        flexDirection: 'row',
        gap: width * .05,

    },
    overviewDatesBlock: {
        display: 'flex',
        flexDirection: 'row',
    },
    overviewDatesText: {
        paddingLeft: width * .02,
    },
    overviewDuration: {
        display: 'flex',
        flexDirection: 'row',
    },
    overviewExperience: {
        display: 'flex',
        flexDirection: 'row',
    },
    iconTextUpper: {
        color: 'black',
    },
    iconTextLower: {
        color: 'black',
        fontWeight: 'bold',
    },
    payContainer: {
        maxWidth: width * 0.6,
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#C9C9C9',
        borderRadius: 9,

    },
    payLeftItem: {
        paddingLeft: width * 0.02,
        paddingTop: '1%',
        paddingBottom: '2%',

    },
    payRightItem: {
        paddingLeft: width * 0.075,
        justifyContent: 'center',

    },
    payUpperText: {
        color: '#A1A1A1',
        fontSize: 12,

    },
    payLowerText: {
        color: '#2CAC5F',
        fontSize: 20,
        fontWeight: 'bold',

    },
    payRangeText: {
        color: '#2CAC5F',
        fontSize: 20,
        fontWeight: 'bold',

    },
    descriptionBody: {
        paddingTop: '1%',
        paddingBottom: '2%',
        paddingHorizontal: '2%',
        borderWidth: 1,
        borderColor: '#C9C9C9',
        borderRadius: 9,
        

    },
    buttonContainer: {
        flex: 1,
        paddingLeft: '50%',
        
    button: {
        color: '#0EA68D',
        backgroundColor: '#FFF',
        elevation: 5, // This will add a box shadow for Android
        shadowColor: "#000",  // this will add a box shadow for IOS
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },

    }
});

export default JobPosting;