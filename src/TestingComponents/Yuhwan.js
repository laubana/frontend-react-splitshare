import React, { useState, useEffect } from "react";
import store from "../config/firebaseConfig";
import { storage } from "../config/firebaseConfig";
import {
  collection,
  query,
  orderBy,
  startAfter,
  limit,
  getDocs,
} from "firebase/firestore";

import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import Pagination from "../components/base/Pagination/Pagination";
import SingleImageInput from "../components/base/SingleImageInput/SingleImageInput";
import ImageInput from "../components/base/ImageInput/ImageInput";
import NumberInput from "../components/base/NumberInput/NumberInput";
import DatePicker from "../components/base/DatePicker/DatePicker";
import TimePicker from "../components/base/TimePicker/TimePicker";
import Dropdown from "../components/base/Dropdown/Dropdown";
import ImageList from "../components/base/ImageList/ImageList";
import InfinitePagination from "../components/base/InfinitePagination/InfinitePagination";
import Accordion from "../components/base/Accordion/Accordion";
import Button from "../components/base/Button/Button";
import Grid from "../components/layout/Grid/Grid";
import ActiveListingCard from "../components/base/ActiveListingCard/ActiveListingCard";
import Modal from "../components/base/Modal/Modal";

import { v4 as uuidv4 } from "uuid";

const Yuhwan = (props) => {
  /* Pagination */
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [pageNumber, setPageNumber] = useState(5);
  const [totalPageNumber, setTotalPageNumber] = useState();
  const [items, setItems] = useState([]);

  const itemNumber = 4;

  useEffect(() => {
    const productsQuery = query(
      collection(store, "product"),
      orderBy("createdAt", "desc")
    );

    getDocs(productsQuery)
      .then((response) => {
        setTotalPageNumber(Math.ceil(response.docs.length / itemNumber));

        if (currentPageIndex === totalPageNumber) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }

        if (1 < currentPageIndex) {
          let _productsQuery;

          _productsQuery = query(
            collection(store, "product"),
            orderBy("createdAt", "desc"),
            limit(itemNumber * (currentPageIndex - 1))
          );

          getDocs(_productsQuery)
            .then((response) => {
              const docs = [];
              response.docs.forEach((doc) => {
                docs.push(doc);
              });

              const __productsQuery = query(
                collection(store, "product"),
                orderBy("createdAt", "desc"),
                startAfter(docs[docs.length - 1]),
                limit(itemNumber)
              );

              getDocs(__productsQuery)
                .then((response) => {
                  const _items = [];
                  response.docs.forEach((doc, index) => {
                    const data = doc.data();

                    const today = new Date();
                    let createdAt = new Date(data.createdAt.toDate());
                    createdAt.setHours(0, 0, 0, 0);
                    today.setHours(0, 0, 0, 0);
                    const timeDiff = today.getTime() - createdAt.getTime();
                    const days = Math.abs(
                      Math.floor(timeDiff / (1000 * 60 * 60 * 24))
                    );

                    _items.push(
                      <ActiveListingCard
                        days={days}
                        source={`https://picsum.photos/id/${
                          index + 1
                        }0/1500/1500`}
                        itemname={data.name}
                        price={data.price}
                        stock={data.qty}
                        key={index}
                      />
                    );
                  });

                  setItems([..._items]);
                })
                .catch((error) => {
                  console.log(error);
                });
            })
            .catch((error) => {
              console.log(error);
            });

          _productsQuery = query(
            collection(store, "product"),
            orderBy("createdAt", "desc"),
            limit(itemNumber * currentPageIndex)
          );

          getDocs(_productsQuery)
            .then((response) => {
              console.log(`scrolledItems : ${response.docs.length}`);

              const _items = [];
              response.docs.forEach((doc, index) => {
                const data = doc.data();

                const today = new Date();
                let createdAt = new Date(data.createdAt.toDate());
                createdAt.setHours(0, 0, 0, 0);
                today.setHours(0, 0, 0, 0);
                const timeDiff = today.getTime() - createdAt.getTime();
                const days = Math.abs(
                  Math.floor(timeDiff / (1000 * 60 * 60 * 24))
                );

                _items.push(
                  <ActiveListingCard
                    days={days}
                    source={`https://picsum.photos/id/${index + 1}0/1500/1500`}
                    itemname={data.name}
                    price={data.price}
                    stock={data.qty}
                    key={index}
                  />
                );
              });

              setScrollItems([..._items]);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          const _productsQuery = query(
            collection(store, "product"),
            orderBy("createdAt", "desc"),
            limit(itemNumber)
          );

          getDocs(_productsQuery)
            .then((response) => {
              const _items = [];
              response.docs.forEach((doc, index) => {
                const data = doc.data();

                const today = new Date();
                let createdAt = new Date(data.createdAt.toDate());
                createdAt.setHours(0, 0, 0, 0);
                today.setHours(0, 0, 0, 0);
                const timeDiff = today.getTime() - createdAt.getTime();
                const days = Math.abs(
                  Math.floor(timeDiff / (1000 * 60 * 60 * 24))
                );

                _items.push(
                  <ActiveListingCard
                    days={days}
                    source={`https://picsum.photos/id/${index + 1}0/1500/1500`}
                    itemname={data.name}
                    price={data.price}
                    stock={data.qty}
                    key={index}
                  />
                );
              });

              setItems([..._items]);
              setScrollItems([..._items]);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentPageIndex]);

  const handleOnClick = (pageIndex) => {
    setCurrentPageIndex(pageIndex);
  };

  /* SingleImageInput */
  const [singleImage, setSingleImage] = useState([]);

  const handleOnSingleUpload = () => {
    if (singleImage.length !== 0) {
      for (const image of singleImage) {
        const file = image.file;
        const uniqueId = uuidv4();

        const fileRef = ref(
          storage,
          `image/${file.name.split(".")[0]}-${uniqueId}`
        );

        const uploadTask = uploadBytesResumable(fileRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

            console.log(progress + "% Done.");
          },
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(fileRef).then((url) => {
              console.log(url);
            });
          }
        );
      }

      setSingleImage([]);
    }
  };

  /* MultipleImageInput */
  const [multipleImages, setMultipleImages] = useState([]);

  /* ImageInput */
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleOnMultipleUpload = () => {
    if (multipleImages.length !== 0) {
      for (const image of multipleImages) {
        const file = image.file;

        const fileRef = ref(storage, "image/" + file.name);

        const uploadTask = uploadBytesResumable(fileRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

            console.log(progress + "% Done.");
          },
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(fileRef).then((url) => {
              console.log(url);
            });
          }
        );
      }

      setMultipleImages([]);
    }
  };

  const handleOnRefresh = () => {
    const directoryRef = ref(storage, "image");

    listAll(directoryRef)
      .then(async (res) => {
        const files = [];

        const promises = res.items.map(async (fileRef, index) => {
          await getDownloadURL(fileRef).then((url) => {
            files.push(url);
          });
        });

        await Promise.all(promises);

        setUploadedImages([...files.sort()]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /* NumberInput */
  const [number, setNumber] = useState(0);

  /* DatePicker */
  const [date, setDate] = useState();

  /* TimePicker */
  const [time, setTime] = useState("");

  /* Dropdown */
  const [selectedOption, setSelectedOption] = useState("");
  const options = [
    { value: "value1", label: "label1" },
    { value: "value2", label: "label2" },
    { value: "value3", label: "label3" },
  ];

  /* ImageList */
  const images = [
    "https://picsum.photos/id/10/900/600",
    "https://picsum.photos/id/20/900/600",
    "https://picsum.photos/id/30/900/600",
    "https://picsum.photos/id/40/900/600",
    "https://picsum.photos/id/50/900/600",
    "https://picsum.photos/id/60/900/600",
    "https://picsum.photos/id/70/900/600",
    "https://picsum.photos/id/80/900/600",
  ];

  /* InfinitePagination */
  const [scrollItems, setScrollItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const handleOnScroll = () => {
    setCurrentPageIndex((oldData) => oldData + 1);
  };

  /* Accordion */
  const [accordionVisibility, setAccordionVisibility] = useState(false);

  const handleOnToggle = () => {
    setAccordionVisibility((oldValue) => !oldValue);
  };

  /* Modal */
  const [modalVisibility, setModalVisibility] = useState(false);

  const handleOnOpen = () => {
    setModalVisibility(true);
  };

  const handleOnClose = () => {
    setModalVisibility(false);
  };

  return (
    <div>
      <h1>Yuhwan</h1>
      <div>Test here</div>
      <div>
        <h2>Page</h2>
        <h2>Pagination</h2>

        <div
          style={{
            width: "100%",
            maxWidth: "800px",
            margin: "auto",
            boxSizing: "border-box",
          }}
        >
          <Pagination
            currentPageIndex={currentPageIndex}
            pageNumber={pageNumber}
            totalPageNumber={totalPageNumber}
            onClick={handleOnClick}
          />
          <Grid columns={4}>{items.map((item, index) => item)}</Grid>
        </div>
      </div>
      <div>
        <h2>SingleImageInput</h2>
        <div style={{ width: "100%", maxWidth: "300px", margin: "auto" }}>
          <SingleImageInput images={singleImage} setImages={setSingleImage} />
          <Button
            size="lg"
            label="Upload Test!!!!!"
            onClickHandler={handleOnSingleUpload}
            hoverable
          />
        </div>
      </div>
      <div>
        <h2>ImageInput</h2>
        <div style={{ width: "100%", maxWidth: "500px", margin: "auto" }}>
          <ImageInput images={multipleImages} setImages={setMultipleImages} />
          <Button
            size="lg"
            label="Upload Test!!!!!"
            onClickHandler={handleOnMultipleUpload}
            hoverable
          />
          <Button
            size="lg"
            label="Refresh!!!!!"
            onClickHandler={handleOnRefresh}
            hoverable
          />
          <ImageList images={uploadedImages} />
        </div>
      </div>
      <div>
        <h2>NumberInput</h2>
        <NumberInput
          inputNumber={number}
          setInputNumber={setNumber}
          maxValue={10}
        />
      </div>
      <div>
        <h2>DatePicker</h2>
        <DatePicker date={date} setDate={setDate} />
      </div>
      <div>
        <h2>TimePicker</h2>
        <TimePicker time={time} setTime={setTime} />
      </div>
      <div>
        <h2>Dropdown</h2>
        <Dropdown
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          options={options}
          label="Select"
        />
      </div>
      <div>
        <h2>ImageList</h2>
        <div
          style={{
            width: "100%",
            maxWidth: "500px",
            margin: "auto",
            boxSizing: "border-box",
          }}
        >
          <ImageList images={images} />
          <br />
          <br />
          <br />
          <ImageList images={images} mode="vertical" />
        </div>
      </div>
      <div>
        <h2>Accordion</h2>
        <div
          style={{
            width: "100%",
            maxWidth: "500px",
            padding: "16px",
            margin: "auto",
            boxSizing: "border-box",
          }}
        >
          <Accordion
            visibility={accordionVisibility}
            label="Lorem ipsum"
            onToggle={handleOnToggle}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Accordion>
        </div>
      </div>
      <div>
        <h2>Button</h2>
        <div>
          <Button variant="black" size="sm" label="Button" hoverable />
          <Button variant="dark-blue" size="sm" label="Button" hoverable />
          <Button variant="light-blue" size="sm" label="Button" hoverable />
          <Button variant="yellow" size="sm" label="Button" hoverable />
          <Button variant="white" size="sm" label="Button" hoverable />

          <Button variant="black" size="sm" label="Button" disabled />
        </div>
        <div>
          <Button variant="black" size="md" label="Button" hoverable />
          <Button variant="dark-blue" size="md" label="Button" hoverable />
          <Button variant="light-blue" size="md" label="Button" hoverable />
          <Button variant="yellow" size="md" label="Button" hoverable />
          <Button variant="white" size="md" label="Button" hoverable />

          <Button variant="black" size="md" label="Button" disabled />
        </div>

        <div>
          <Button variant="black" size="lg" label="Button" hoverable />
          <Button variant="dark-blue" size="lg" label="Button" hoverable />
          <Button variant="light-blue" size="lg" label="Button" hoverable />
          <Button variant="yellow" size="lg" label="Button" hoverable />
          <Button variant="white" size="lg" label="Button" hoverable />

          <Button variant="black" size="lg" label="Button" disabled />
        </div>
        <div>
          <Button variant="black" size="lg" label="Button" />
          <Button variant="dark-blue" size="lg" label="Button" />
          <Button variant="light-blue" size="lg" label="Button" />
          <Button variant="yellow" size="lg" label="Button" />
          <Button variant="white" size="lg" label="Button" />
        </div>
      </div>
      <div style={{ marginBottom: "300px" }}>
        <div>
          <h2>Modal</h2>
          <div style={{ width: "100%", maxWidth: "300px", margin: "auto" }}>
            <Button
              variant="yellow"
              size="lg"
              label="Open Modal"
              onClickHandler={handleOnOpen}
            />
          </div>
          <Modal
            width="30vw"
            visibility={modalVisibility}
            onClose={handleOnClose}
          >
            <ImageList images={images} />
          </Modal>
        </div>
        <div>
          <h2>InfinitePagination</h2>
          <div
            style={{
              width: "100%",
              maxWidth: "800px",
              margin: "auto",
              boxSizing: "border-box",
            }}
          >
            <InfinitePagination
              columns={4}
              items={scrollItems}
              hasMore={hasMore}
              onScroll={handleOnScroll}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Yuhwan;
