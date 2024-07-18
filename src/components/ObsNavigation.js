import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Pressable,
  Image,
  Text,
} from 'react-native';
import { rangeArray, pad } from '../core/utils'
import { obsHierarchy, obsNbrPictures } from '../constants/obsHierarchy'
import useBrowserData from '../hooks/useBrowserData'
import i18n from '../constants/i18n'

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    padding: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  content: {
    paddingTop: 8,
    paddingHorizontal: 16,
  },
  /** Header */
  header: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  headerTop: {
    marginHorizontal: -6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
  },
  subHeaderTitle: {
    fontSize: 32,
    textAlign: 'center',
    fontWeight: '700',
    color: '#1d1d1d',
  },
  /** Card */
  card: {
    position: 'relative',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 16,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardTop: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardImg: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardBody: {
    padding: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#232425',
    marginRight: 'auto',
  },
});

const bibleData = {
  "freeType": false,
  "curPath": "",
  "title": "Open Bible Stories",
  "image": {
      "origin": "Local",
      "filename": "img/test.jpg"
  },
  "language": "eng",
  "mediaType": "bible"
}

export default function ObsNavigation(props) {
  const [curLevel, setCurLevel] = useState(1)
  const [level1, setLevel1] = useState(1)
  const [level2, setLevel2] = useState("")
  const curSerie = bibleData
  // eslint-disable-next-line no-unused-vars
  const [curList,setCurList] = useState((curSerie!=null) ? curSerie.bibleBookList : [])
  const { onExitNavigation, onSelect, stories } = props
  // const curSerie = (curPlay!=null) ? curPlay.curSerie : undefined
  const { size, largeScreen } = useBrowserData()

  // eslint-disable-next-line no-unused-vars
  const handleClick = (ev,id,_isBookIcon) => {
    if (curLevel===1){
      setLevel1(id)
      setCurLevel(2)
    } else if (curLevel===2){
      const bookObj = {}
      const curSerie = {}
      // onStartPlay(curSerie,bookObj,id)
      onSelect(id,1) // story = id, frame = 1
      setLevel2(id)
    } else {
      // const bookObj = naviChapters[level1][level2][level3]
      // // const {curSerie} = curPlay
      // onStartPlay(curSerie,bookObj,id)
    }
  }

  const navigateUp = (level) => {
    if (level===0){
      onExitNavigation()
    } else {
      setCurLevel(level)
    }
  }

  const handleReturn = () => {
    if (curLevel>2){
      navigateUp(2)
    } else
    if (curLevel>1){
      navigateUp(curLevel-1)
    } else {
      onExitNavigation()
    }
  }

  let validIconList = []
  if (curLevel===1){
    obsHierarchy.map((obj,iconInx) => {
      const curIconObj = 
      { 
        id: iconInx,
        img: obj.img, 
        name: i18n.t(obj.title), 
      }
      validIconList.push(curIconObj)
    })
  }
  if (curLevel===2){
    const curObj = obsHierarchy[level1]
    const beg = curObj.beg
    const end = beg + curObj.count -1
    rangeArray(beg,end).forEach(inx => {
      const curIconObj = {
        id: inx,
        img: `../../assets/obs-images/obs-en-${pad(inx)}-01.jpg`,
        name: stories[inx-1],
        // subtitle: "test",
        isBookIcon: false
      }
      validIconList.push(curIconObj)
    })
  }
  if (curLevel===3){
    const beg = 1
    const end = beg + obsNbrPictures[level2-1] -1
    rangeArray(beg,end).forEach(inx => {
      const curIconObj = {
        id: inx,
        img: `../../assets/obs-images/obs-en-${pad(level2)}-${pad(inx)}.jpg`,
        name: "",
        isBookIcon: false
      }
      validIconList.push(curIconObj)
    })
    // obsTitles
  }

  let useCols = 3
  if (size==="xs") useCols = 2
  else if (size==="lg") useCols = 4
  else if (size==="xl") useCols = 5

  const rootLevel = (curLevel===1)
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f2f2f2' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Open Bible Stories</Text>
          {!rootLevel && (
            <Text 
              style={styles.subHeaderTitle}
              onClick={handleReturn}
            >
              {"<"}
            </Text>
          )}
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          {validIconList.map(
            ({ id, img, name }) => {
              return (
                <Pressable
                  key={id}
                  onPress={(ev) => handleClick(ev,id,true)}
                >
                  <View style={styles.card}>
                    <View style={styles.cardTop}>
                      <Image
                        alt=""
                        resizeMode="center"
                        style={styles.cardImg}
                        source={{ uri: img }} />
                    </View>

                    <View style={styles.cardBody}>
                      <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>{name}</Text>
                      </View>
                    </View>
                  </View>
                </Pressable>
              );
            },
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
