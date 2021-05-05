import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import styled from 'styled-components'
import { XCircle, Upload } from 'react-feather'
import { generateId } from '../../utils'
import { Challenge, ChallengeResult } from '../../constants'
import { useIpfs } from '../../hooks/Application/useIpfs'

export enum FileType {
  initial,
  image = 'image',
}

export type FilesState = {
  id?: string
  type?: FileType
  blobOrUrl?: string
  arrayBuffer?: ArrayBuffer
}

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  input[type='file'] {
    opacity: 0; /* make transparent */
    z-index: -1; /* move under anything else */
    position: absolute; /* don't let it take up space */
  }

  label {
    width: 25px;
    height: 25px;
    cursor: pointer;
  }
`

const Item = styled.div`
  position: relative;
  img,
  video {
    border-radius: 10px;
    max-height: 350px;
  }

  img {
    max-height: 300px;
  }
`

const ItemPlaceHolder = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 300px;
  padding: 10px;
  border: 1px solid;
  border-radius: 10px;
  line-height: 1.6;
`

const RemoveItemButton = styled.div`
  width: 25px;
  height: 25px;
  cursor: pointer;
`

const InfoText = styled.div`
  word-break: break-word;
`

const ImportantText = styled.div`
  padding: 10px 0;
  text-align: center;
  font-size: 1.2rem;
  word-break: break-word;
`

const LightColor = styled.span`
  color: ${({ theme }) => theme.light1};
`

export default function OwnerReport({
  isOwner,
  challenge,
  setReport,
}: {
  isOwner: boolean
  challenge: Challenge
  setReport: Dispatch<SetStateAction<FilesState[] | undefined>>
}) {
  const [files, setFiles] = useState<FilesState[]>()
  const { getIpfsUrlPreffix } = useIpfs()
  const isOwnerReported = useMemo(() => {
    return (
      challenge?.ownerResult === ChallengeResult.Success ||
      challenge?.ownerResult === ChallengeResult.Failure
    )
  }, [challenge?.ownerResult])

  const handleFileSelected = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e?.target?.files) {
        const inputFiles = Array.from(e.target.files)

        const addFiles: FilesState[] = []
        for (let index = 0; index < inputFiles.length; index++) {
          const f = inputFiles[index]
          const fileType = f?.type?.match(/image\/.+/) ? FileType.image : null
          if (!fileType) return
          try {
            const fileStr = URL.createObjectURL(f)
            const fileBuffer = await f.arrayBuffer()
            addFiles.push({
              id: generateId(),
              type: fileType,
              blobOrUrl: fileStr,
              arrayBuffer: fileBuffer,
            })
          } catch (error) {
            console.error(error)
          }
        }
        setFiles([...addFiles])
      }
    },
    [setFiles],
  )

  useEffect(() => {
    const path = challenge?.ownerReportPath
    if (isOwnerReported && path && path !== '') {
      const typeStr = path.substring(0, 5)
      const fileType: FileType =
        typeStr === FileType.image ? FileType.image : FileType.initial
      const hash = path.substring(5)
      const file: FilesState = {
        id: generateId(),
        type: fileType,
        blobOrUrl: `${getIpfsUrlPreffix()}/${hash}`,
      }
      hash &&
        hash.length > 0 &&
        fileType !== FileType.initial &&
        setFiles([file])
    }
  }, [isOwnerReported, challenge?.ownerReportPath, getIpfsUrlPreffix, setFiles])

  useEffect(() => {
    setReport(files)
  }, [setReport, files])

  const removeItems = useCallback(() => {
    setFiles([])
  }, [setFiles])

  return (
    <>
      {isOwner && !isOwnerReported && (
        <InputContainer>
          <input id="file-upload" type="file" onChange={handleFileSelected} />
          <label htmlFor="file-upload">
            <Upload />
          </label>
          {files && files.length > 0 && (
            <RemoveItemButton onClick={() => removeItems()}>
              <XCircle />
            </RemoveItemButton>
          )}
        </InputContainer>
      )}
      {files?.map((file) => {
        if (!file?.id) return null
        return (
          <Item key={file.id}>
            {file?.type === FileType.image && (
              <img src={file?.blobOrUrl} width={'100%'} alt={''} />
            )}
          </Item>
        )
      })}
      {isOwner && !isOwnerReported && !(files && files.length > 0) && (
        <ItemPlaceHolder>
          <InfoText>
            <LightColor>
              Hopefully you reached your goal and are reporting on
              success. If so, Please upload a photo indicating your success.
            </LightColor>
          </InfoText>
          <ImportantText>
            <LightColor>
              Doing so will help your supporters to acknowledge your success and vote accordingly!
            </LightColor>
          </ImportantText>
        </ItemPlaceHolder>
      )}
      {!isOwner && isOwnerReported && !(files && files.length > 0) && (
        <ItemPlaceHolder>
          <InfoText>
            <LightColor>Please note,</LightColor>
          </InfoText>
          <ImportantText>
            <LightColor>
              Challenger reported on success but provided no indication photo.
            </LightColor>
          </ImportantText>
        </ItemPlaceHolder>
      )}
    </>
  )
}
