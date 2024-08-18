import React, {
    PropsWithChildren,
    Ref,
    forwardRef,
    useCallback,
    useImperativeHandle,
    useMemo,
    useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import imageCompression from 'browser-image-compression';
import classNames from 'classnames';
import { uploadPhoto } from '@/api/common';
import { UploadFileProps, UploadFileRef } from '@/types/vip-ui/upload-file';
import Toast from '../Toast';
import ImageViewer from '../ImageViewer';
import Loading from '../Loading';
import Button from '../Button';

enum ImageStatus {
    SUCCESS = 'success', //上传成功
    ERROR = 'error', //上传失败
    LOADING = 'loading', //上传中
    NOT_UPLOADED = 'notUploaded', //未上传
}
interface ImageState {
    tempUrl: string;
    file: File;
    status: ImageStatus; // 是否上传成功
    url?: string; //上传成功后地址
}
const UploadFile = forwardRef(
    (props: PropsWithChildren<UploadFileProps>, ref: Ref<UploadFileRef>) => {
        const {
            onChange,
            max = 8,
            multiple = true,
            isDirectUploads = false,
            isCompressedImages = true,
            isAutomation = false,
        } = props;
        const { t } = useTranslation();
        const [imageList, setImageList] = useState<ImageState[]>([]);

        useImperativeHandle(ref, () => ({
            getImagesUrl,
        }));

        const isLoading = useMemo(
            () => imageList.some((it) => it.status === ImageStatus.LOADING),
            [imageList],
        );

        //压缩图片
        const handleCompressedImages = async (file: File) => {
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 760,
                useWebWorker: true,
                alwaysKeepResolution: true,
            };
            const compressedFile = await imageCompression(file, options);
            return compressedFile;
        };

        // 上传单张图片
        const uploadImage = useCallback((imageItem: ImageState) => {
            handleChangeImageStatus(imageItem.tempUrl, ImageStatus.LOADING);
            return new Promise((resolve, reject) => {
                const formData = new FormData();
                formData.append('file', imageItem.file);
                uploadPhoto(formData)
                    .then((res) => {
                        if (res.code === 10000) {
                            //上传成功
                            setImageList((prev) => [
                                ...prev.map((it) => {
                                    if (it.tempUrl === imageItem.tempUrl) {
                                        return {
                                            ...it,
                                            status: ImageStatus.SUCCESS,
                                            url: res.data,
                                        };
                                    } else return it;
                                }),
                            ]);
                            resolve(res.data);
                        } else {
                            // 上传失败
                            handleChangeImageStatus(
                                imageItem.tempUrl,
                                ImageStatus.ERROR,
                            );
                            reject(res.msg);
                        }
                    })
                    .catch(async (err: any) => {
                        // 上传失败
                        handleChangeImageStatus(
                            imageItem.tempUrl,
                            ImageStatus.ERROR,
                        );
                        reject(err);
                    });
            });
        }, []);

        // 上传所有图片
        const getImagesUrl = useCallback(() => {
            if (isLoading) {
                Toast.error(t('app.ui.uploading'));
                return Promise.resolve([]);
            } else {
                return Promise.all(
                    imageList.map((item) => {
                        if (item.status === ImageStatus.SUCCESS) {
                            return item.url;
                        } else {
                            return uploadImage(item);
                        }
                    }),
                )
                    .then((resList) => {
                        return resList;
                    })
                    .catch((err) => {
                        return [];
                    });
            }
        }, [imageList, isLoading, t, uploadImage]);

        // 选中图片
        const handleImageChange = useCallback(
            async (event) => {
                for (
                    let index = 0;
                    index < event.target.files.length;
                    index++
                ) {
                    if (imageList.length === max) {
                        setImageList(imageList);
                        return Toast.error(
                            t('app.ui.uploadMaxSheets', { max }),
                        );
                    }

                    let file = event.target.files[index];
                    if (file) {
                        /** 开启压缩 */
                        if (isCompressedImages) {
                            const compressedBlob = await handleCompressedImages(
                                file,
                            );
                            file = new File([compressedBlob], file.name, {
                                type: compressedBlob.type,
                                lastModified: Date.now(),
                            });
                        }
                        const tempUrl = URL.createObjectURL(file);
                        const imageItem = {
                            tempUrl,
                            file,
                            status: ImageStatus.NOT_UPLOADED,
                        };

                        setImageList((prev) => [...prev, imageItem]);
                        // 自动上传
                        isAutomation && uploadImage(imageItem);
                    }
                }
            },
            [imageList, isAutomation, isCompressedImages, max, t, uploadImage],
        );

        // 改变image当前状态
        const handleChangeImageStatus = (key: string, status: ImageStatus) => {
            setImageList((prev) => [
                ...prev.map((it) => {
                    if (it.tempUrl === key) {
                        return {
                            ...it,
                            status,
                        };
                    } else return it;
                }),
            ]);
        };

        // 取消选中图片
        const handleDelete = (index) => {
            setImageList((prev) => prev.filter((_, i) => i !== index));
        };

        return (
            <div className="flex flex-wrap justify-between px-[16px]">
                {imageList.map((item, i) => (
                    <div
                        className={classNames(
                            'w-[96px] h-[96px] p-[10px] border border-solid rounded-[16px] mb-[10px] relative',
                            {
                                'border-[#60513C]':
                                    item.status === ImageStatus.NOT_UPLOADED ||
                                    item.status === ImageStatus.LOADING,
                                'border-[#4CAF50]':
                                    item.status === ImageStatus.SUCCESS,
                                'border-[#FF5A5A]':
                                    item.status === ImageStatus.ERROR,
                            },
                        )}
                        key={i}
                    >
                        <div className="w-full h-full">
                            <img
                                className="w-full h-full"
                                src={item.tempUrl}
                                onClick={() => {
                                    ImageViewer.show({ image: item.tempUrl });
                                }}
                            />
                            {/*上传中 */}
                            {item.status === ImageStatus.LOADING && (
                                <div className="inset-0 absolute w-full h-full bg-[rgba(0,0,0,0.5)] rounded-[16px] flex-row-center">
                                    <Loading text={t('app.ui.uploading')} />
                                </div>
                            )}
                            {/* 上传失败 */}
                            {item.status === ImageStatus.ERROR && (
                                <div className="inset-0 absolute w-full h-full bg-[rgba(0,0,0,0.5)] rounded-[16px] flex-col-center">
                                    <img
                                        onClick={() => uploadImage(item)}
                                        className="w-[24px] h-[24px]"
                                        src={require('@/assets/images/icon/other/resetUpload.png')}
                                    />
                                    <Button
                                        onClick={() => uploadImage(item)}
                                        className="text-[12px] w-[72px] h-[26px] mt-[4px]"
                                    >
                                        {t('app.button.reUpload')}
                                    </Button>
                                </div>
                            )}
                        </div>
                        {/* 关闭icon */}
                        <img
                            className="w-[12px] h-[12px] absolute -right-[3px] -top-[3px]"
                            src={require('@/assets/images/icon/form/clear.png')}
                            onClick={() => handleDelete(i)}
                        />
                    </div>
                ))}
                {/* 上传按钮 */}
                {imageList.length < max && (
                    <div className="w-[96px] h-[96px] border border-dashed border-[#595759] rounded-[16px] relative">
                        <input
                            id="fileInput"
                            type="file"
                            name="image"
                            accept="image/*"
                            multiple={multiple}
                            disabled={isLoading}
                            onChange={handleImageChange}
                            className="w-full h-full opacity-0"
                        />
                        <label htmlFor="fileInput">
                            <img
                                className="w-[26px] h-[26px] absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                src={require('@/assets/images/common/upload.png')}
                            />
                        </label>
                    </div>
                )}
                {Array(3 - (imageList.length % 3))
                    .fill('')
                    .map((_, i) => (
                        <i className="w-[96px]" key={i} />
                    ))}
            </div>
        );
    },
);

export default UploadFile;
