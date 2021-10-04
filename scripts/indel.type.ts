type Indel = {
  query: string;
  subject: string;
  indelInfo: {
    type: 'insertion' | 'deletion';
    start: number;
    end: number;
    size: number;
  };
  csi: {
    id: string;
    gi: string;
    defaultParent: string;
    parent: string;
    specificity: string;
    type: string;
    eValue: string;
    proteinName?: string;
    reference?: string;
    private: string;
  }
}

export {Indel}
