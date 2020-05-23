const firstColor = '#F8651F';
const secondColor = '#ffffff';
const mainFontFamily = 'QuicksandLight';

export const sharedStyles = {
    primaryColor: firstColor,
    secondaryColor: secondColor,
    primaryFontFamily: mainFontFamily,
    tabHeaderTitleStyle: { fontSize: 24, color: secondColor, fontFamily: 'sans-serif-light' },
    headerTitleStyle: { fontSize: 20, color: 'black', fontFamily: 'sans-serif-light' },
    mainPageStyle: { flex: 1, padding: 5, backgroundColor: '#D8D7E9' },
    normalButtonStyle: { color: secondColor },
    basicButtonStyle: { backgroundColor: firstColor, fontFamily: mainFontFamily, fontSize: 60 },
    basicButtonTitleStyle: { color: secondColor },
    pageTitleStyle: { fontWeight: '200', fontFamily: mainFontFamily, color: secondColor },  //fontweight 200 is very important, please google for more details
    tabBarTitleStyle: { fontFamily: mainFontFamily, color: secondColor },
    basicTitleStyle: { fontFamily: mainFontFamily, fontSize: 20 }
};